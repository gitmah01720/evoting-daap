import React , {useState,useEffect,useCallback,useContext} from "react";
import Web3Modal from "web3modal";
import { ethers, utils } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";
import { useRouter } from "next/router";

// intarnal imports:
import { VotingAddress, VotingAddressABI } from "./constants";
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

  // ---------------- end of candidate data.

  // error handelling
  const [error, setError] = useState('');

  const highestVote  = [];

  
  // ---------------- Voter Sectoin
  const pushVoter=[];
  const [voterArray, setVoterArray] = useState(pushVoter);
  const [voterLength, setVoterLength] = useState('');
  const [voterAddress, setVoterAddress] = useState([]);
  
  //---------------- connection the wallet metamask;

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

  // -------------- connecting the wallet.
  const connectWallet  = async()=>{
    if (!window.ethereum) return setError("Meta mask is not installed.")

    const account = await window.ethereum.request({method: "eth_requestAccounts"});
    
    setCurrentAccount(account[0]);
  }


  // ------------- upload to ipfs.
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

  // -------------------- Creating Voter.
 const createVoter = async (formInput,fileUrl,router)=>{
  try{
    const {name,address,position} = formInput;
    console.log(`Name = ${name}, adr = ${address} ,pos = ${position} url = ${fileUrl}`)
  }catch(error){
    setError("Error in creating voter.")
  }
 }

  return (
    <VotingContext.Provider value = {{votingTitle,checkIfWalletConnected,connectWallet,uploadToIPFS,createVoter}}>
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
