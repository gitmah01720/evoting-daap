import React , {useState,useEffect,useCallback,useContext} from "react";
import Web3Modal from "web3modal";
import { ethers, utils } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";
import { useRouter } from "next/router";

// intarnal imports:
import { VotingAddress, VotingAddressABI } from "./constants";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
// import reactDom from "react-dom";
// import { useState } from "react/cjs/react.production.min";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider);

export const VotingContext = React.createContext();
export const VotingProvider = ({ children }) => {
  const votingTitle = 'Mahesh, welcome to first voting daap';



  const router = useRouter();
  const [currentAccount, setCurrentAccount] = useState('');
  const [candidateLength, setCandidateLength] = useState('');
  const pushCandidate = [];
  const candidateIndex = [];
  const [candidateArray, setCandidateArray] = useState(pushCandidate);
  const [candidateAddress, setCandidateAddress] = useState([]);

  // ---------------- end of candidate data.

  // error handelling
  const [error, setError] = useState('');

  const highestVote  = [];

  
  // ---------------- Voter Sectoin
  const pushVoter=[];
  const [voterArray, setVoterArray] = useState(pushVoter);
  const [voterLength, setVoterLength] = useState('');
  const [voterAddress, setVoterAddress] = useState([]);
  
  //!---------------- connection the wallet metamask;

  // ------------ checking the metamask connectoin
  const checkIfWalletConnected = async() => {
    if (!window.ethereum) return setError("Meta mask is not installed.")

    const account = await window.ethereum.request({method: "eth_accounts"});
    if (account.length) {
      setCurrentAccount(account[0]);
    }else{
      setError("Meta mask is reload is required.")
    }
  }

  //connecting the wallet.
  const connectWallet  = async()=>{
    if (!window.ethereum) return setError("Meta mask is not installed.")

    const account = await window.ethereum.request({method: "eth_requestAccounts"});
    
    setCurrentAccount(account[0]);
  }


  //! ------------- upload to ipfs.
  const uploadToIPFS = async(file)=>{
    try{
      // const added = await client.add({content:file});
      // const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      const url = `https://ipfs.infura.io/ipfs/${1}`;
      return url;

    }catch (error){
      setError("Error in file uploading to IPFS.")
    }
  }

  //! --------------------  Voter Section.
 const createVoter = async (formInput,fileUrl,router)=>{
  try{
    const {name,address,position} = formInput;
    console.log(`Name = ${name}, adr = ${address} ,pos = ${position} url = ${fileUrl}`);
    if(!name || !address || !position) return setError("Input data is missing");
    
    
    
    
    
    // -----------Connecting Smart contract--------------------
    const web3modal = new Web3Modal();
    // console.log(web3modal);


    const connection = await web3modal.connect();
    const provider  = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract  = fetchContract(signer);

    console.log(contract); // worked fine with web3model version 1.9.8 @gitmah01720 #2:03:00



    // uploading data to IPFS.
    // const data = JSON.stringify({name,address,position,image:fileUrl});
    // const added =  await client.add(data);
    // const ipfsurl = `https://ipfs.infura.io/ipfs/${added.path}`;

    const ipfsurl = `https://ipfs.infura.io/ipfs/${1}`;
    // console.log(ipfsurl);

    const voter = await contract.setVoter(address,name,fileUrl,ipfsurl);
    voter.wait();
    console.log(voter);

    router.push("/voterList"); // after adding voter redirect to this page.

  }catch(error){
    console.log(error);
    setError("Error in creating voter.");
  }
 }
 
 // get voter data:
 
 const getAllVoterdata = async ()=>{
  try{
    // -----------Connecting Smart contract--------------------
    const web3modal = new Web3Modal();
    // console.log(web3modal);
    const connection = await web3modal.connect();
    const provider  = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract  = fetchContract(signer);

    console.log(contract); // worked fine with web3model version 1.9.8 @gitmah01720 #2:20:00



    // getting voter list:

    const voterListData = await contract.getVoterList();
    setVoterAddress(voterListData);
    console.log(voterAddress); // gettin all voter list.


    voterListData.map(async (el)=>{
      const singleVoterData = await contract.getVoterDatea(el);
      pushCandidate.push(singleVoterData); //! Doubt candi or voter?
      console.log(singleVoterData); // logging single voter info.

    });

    // Voter length:
    const voterListLen = await contract.getvoterLength();
    setVoterLength(voterListLen.toNumber());





  }catch(error){
    console.log(error);
    setError("Error in getting voter.");
  }
 }

 console.log(voterAddress);
 useEffect(()=>{
   getAllVoterdata();

 },[])



 //! --------------------------  voting Section :

  // authorization.
 const giveVote = async (id)=>{
  try{
    // -----------Connecting Smart contract--------------------
    // const web3modal = new Web3Modal();
    // const connection = await web3modal.connect();
    // const provider  = new ethers.providers.Web3Provider(connection);
    // const signer = provider.getSigner();
    // const contract  = fetchContract(signer);
    // console.log(contract); 




  }catch(error){
    console.log(error);
    setError("Error in creating voter.");
  }
 }


 //! -------------------------  candidates sections:

 const createCandidate = async (formInput,fileUrl,router)=>{
  try{
    const {name,address,age} = formInput;
    if(!name || !address || !age) return setError("Input data is missing");
    const data = JSON.stringify({name,address,age,image:fileUrl});
    console.log(data);
    

      // -----------Connecting Smart contract--------------------
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider  = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract  = fetchContract(signer);
    console.log(contract); //? worked fine with web3model version 1.9.8 @gitmah01720 #2:03:00



    // uploading data to IPFS.
    // const data = JSON.stringify({name,address,age,image:fileUrl});
    // const added =  await client.add(data);
    // const ipfsurl = `https://ipfs.infura.io/ipfs/${added.path}`;

    const ipfsurl = `https://ipfs.infura.io/ipfs/${2}/candidate`;

    const candi = await contract.setCandidate(address,name,age,fileUrl,ipfsurl);
    candi.wait();
    console.log(candi);

    router.push("/"); // after adding voter redirect to index page.

  }catch(error){
    console.log(error);
    setError("Error in creating candidate.");
  }
 }


 // ------------- get candidate data:
 
 const getAllCandidatedata = async ()=>{
  try{
    // -----------Connecting Smart contract--------------------
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider  = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract  = fetchContract(signer);
    console.log(contract); 
    //? worked fine with web3model version 1.9.8 @gitmah01720 #2:20:00



    // getting candi list:

    const candiListData = await contract.getCandidates();
    setCandidateAddress(candiListData);
    console.log(candidateAddress); // gettin all candidates list.


    candiListData.map(async (el)=>{
      const singleCandiData = await contract.getCandidateData(el);
      pushCandidate.push(singleCandiData);
      candidateIndex.push(singleCandiData[2].toNumber());
      console.log(singleCandiData); // logging single voter info.

    });

    // Voter length:
    const candiListLen = await contract.getCandidateLength();
    setCandidateLength(candiListLen.toNumber());





  }catch(error){
    console.log(error);
    setError("Error in getting candi lists.");
  }
 }

 console.log(candidateAddress);
 useEffect(()=>{
   getAllCandidatedata();

 },[])




 // returning functions for other pages.
  return (
    <VotingContext.Provider value = {{
      votingTitle,
      checkIfWalletConnected,
      connectWallet,
      uploadToIPFS,
      createVoter,
      getAllVoterdata,
      giveVote,
      createCandidate,
      getAllCandidatedata,
      error,
      voterArray,
      voterLength,
      voterAddress,
      currentAccount,
      candidateLength,
      candidateAddress
      }}>
    {children}
    </VotingContext.Provider>
  );
};

// const Voter = () => {
//   return (
//     <div>Voter</div>
//   )
// }

// export default VotingProvider;
