import React from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";
import { useRouter } from "next/router";

// intarnal imports:
import { VotingAddrss, VotingAddrssAddressABI } from "./constants";
// import reactDom from "react-dom";
// import { useState } from "react/cjs/react.production.min";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(VotingAddrss, VotingAddrssAddressABI, signerOrProvider);

export const VotingContext = React.createContext();
export const VotingProvider = ({ children }) => {
  const votingTitle = 'Mahesh, welcome to first voting daap';
  return (
    <VotingContext.Provider value = {{votingTitle}}>
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
