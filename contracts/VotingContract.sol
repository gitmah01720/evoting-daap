// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >= 0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol"; // counter for voters.
import "hardhat/console.sol";

contract Create {

    using Counters for Counters.Counter;

        // counter for id generation. 
    Counters.Counter public _voterId;
    Counters.Counter public _candidateId;

    address public votingOrganizer; // address of voting admin.

    // candidate info
    struct Candidate{
        uint256 candidateId;
        uint age;
        string name;
        string image;
        uint256 voteCount;  //how many vote this candidate has recieved.
        address _address;   // meta mask addresss of candidate
        string ipfs;   // contains all data about candidate on ipfs link [ data base] IPFS provides a decentralized storage and distribution system,
    }
    // used for creating candidate
    event CandidateCreate ( 
        uint256 indexed candidateId,
        uint age,
        string name,
        string image,
        uint256 voteCount,
        address _address,
        string ipfs
    );

    address[] public candidateAddress;  // list of candidate addresses

    mapping (address => Candidate) public candidatesRegister;  // mapping from voter address to candidate whoom they have voted.

    // voter data

    address[] public votedVoters;  // list of voters who have voted
    address[] public votersAddress;  // list of voters addresses
    
    struct Voter {
        uint256 voter_voterId;
        string voter_name;
        string voter_image;
        address voter_address;
        uint256 voter_allowed; // wheather that voter is allowed to vote or not?
        bool voter_voted;
        uint256 voter_vote; // id of candidate whoom it had voted
        string voter_ipfs; // url of voter information.
    }
    event VoterCreate (
        uint256 indexed voter_voterId,
        string voter_name,
        string voter_image,
        address voter_address,
        uint256 voter_allowed,
        bool voter_voted,
        uint256 voter_vote,
        string voter_ipfs
    );
    mapping (address => Voter) public voterRegister; // mapping between voter address and thieeer info.




    // consturctor for creation of Blockchain.
    constructor() {
        votingOrganizer = msg.sender;  // address of first starter will be organiser.
    }
    // -------------------------- Voter section ---------------------

    // only executed by manager.
    function setCandidate(address _address, string memory _name,uint _age,string memory _image,string memory _ipfs) public {
        require(votingOrganizer == msg.sender, "Only Organizer can register the candidates");
        
        _candidateId.increment();  // generatng id. 

        uint256 idNumber = _candidateId.current();

            // Storage: beacuse we are changing state of variable after creating
        Candidate storage candidate = candidatesRegister[_address]; // create the candidate at given address. 
 
        candidate.age = _age;
        candidate.name = _name;
        candidate.image = _image;
        candidate.ipfs = _ipfs;
        candidate.candidateId = idNumber;
        candidate.voteCount = 0;         // 0 votes initially.
        candidate._address = _address;

        candidateAddress.push(_address); // pushing the address in list.


        // call in same order as event. 
        emit CandidateCreate (
        idNumber,
        _age,
        _name,
        _image,
        candidate.voteCount,
        _address,
        _ipfs
        );


        



    }

    
    function getCandidates() public view returns(address[] memory){ // memory because we will create copy of array   and will return. 
        return candidateAddress;
    }

    
    function getCandidateLength() public view returns(uint256){
        return candidateAddress.length;
    }

    function getCandidateData(address _address) public view returns(string memory, string memory, uint256,uint,uint256,string memory, address) {

        // returning candidate data by given address. 
        return (
            candidatesRegister[_address].name,
            candidatesRegister[_address].image,
            candidatesRegister[_address].voteCount,
            candidatesRegister[_address].age,
            candidatesRegister[_address].candidateId,
            candidatesRegister[_address].ipfs,
            candidatesRegister[_address]._address
        );

    }

    // -------------------------- Voter section ---------------------

    // only executed by manager / contract owner. 
    function setVoter(address _address, string memory _name,string memory _image,string memory _ipfs) public {
        require(votingOrganizer == msg.sender, "Only adminn can create voter");

        _voterId.increment();
        uint256 idNumber = _voterId.current();

        // copy of voter for modification.
        Voter storage voter = voterRegister[_address];
        require(voter.voter_allowed == 0); // this ensure that we are not re registering any user again. 

        voter.voter_address = _address;
        voter.voter_allowed = 1;
        voter.voter_image = _image;
        voter.voter_ipfs = _ipfs;
        voter.voter_name = _name;
        voter.voter_voted = false ;
        voter.voter_voterId = idNumber;
        voter.voter_vote = 1000;    // random number but can be 1. 

        votersAddress.push(_address);

        emit VoterCreate (
        idNumber,
        _name,
        _image,
        _address,
        voter.voter_allowed,
        voter.voter_voted,
        voter.voter_vote,
        _ipfs
        );
        

    } 
    function getVoterDatea(address _address) public view returns(uint256,string memory,string memory,address,bool,uint256, string memory){
        
        return (
        voterRegister[_address].voter_voterId ,
        voterRegister[_address].voter_name ,
        voterRegister[_address].voter_image ,
        voterRegister[_address].voter_address,
        voterRegister[_address].voter_voted ,
        voterRegister[_address].voter_vote ,
        voterRegister[_address].voter_ipfs 
        );
        // voterRegister[_address].voter_allowed,
        
    }

    // external function so anybody can call outside of contract
    function doVote(address _candidateAddr,uint256 _candidatesId) external{
        
        Voter storage voter  = voterRegister[msg.sender];

        require(!voter.voter_voted, "You have already voted");
        require(voter.voter_allowed !=0 , "You are not allowed"); // means already given the vote or not registered as a voter. 

        voter.voter_voted = true;
        voter.voter_vote = _candidatesId;  // this voter has voted to an id. linking with id of candidate. 
        votedVoters.push(msg.sender); // adding to voted-register 
        candidatesRegister[_candidateAddr].voteCount += 1; // incrementing the vote.

    }

    function getvoterLength() public view returns (uint256){
        return votersAddress.length;
    }

    function getVoterList() public view returns(address [] memory){
        return votersAddress;
    }

}   
