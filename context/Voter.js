import React from 'react'
import Web3Modal from 'web3modal'
import {ethers} from 'ethers'
import {create as ipfsHttpClient} from 'ipfs-http-client'
import axios from 'axios'
import { useRouter } from 'next/router'

// intarnal imports:
import { VotingAddrss, VotingAddrssAddressABI } from './constants';

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0")





const Voter = () => {
  return (
    <div>Voter</div>
  )
}

export default Voter