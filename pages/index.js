import React, {useState,useEffect,useContext} from "react";
import Image from "next/image";
import Countdown from "react-countdown";

// internal imports
import { VotingContext } from "../context/Voter";
import Style from "../styles/index.module.css"
import Card from "../components/card/card"
import image from "../assets/candidate-1.jpg"


// connectWallet,
// voterLength,
// voterArray,
// voterAddress,
// getAllVoterdata,
// candidateAddress,

const index = () => {
  const {
    checkIfWalletConnected,
    giveVote,
    candidateLength,
    getAllCandidatedata,
    currentAccount,
    candidateArray,
    voterLength

  } = useContext(VotingContext)

  useEffect(() => {
    checkIfWalletConnected();
  })

    // countdown to vote ending.
  return <div className={Style.home}>{currentAccount && (
    <div className={Style.winner}>
      <div className = {Style.winner_info}>
        <div className = {Style.candidate_list}>
          <p>
            Candidates: <span>{candidateLength}</span>
          </p> 
        </div>
        <div className={Style.candidate_list}>
          <p>
            Voters: <span>{voterLength}</span>
          </p>
        </div>
      </div>

      <div  className = {Style.winner_message}>
        <small>
          <Countdown date = {Date.now() + 100000}/>
        </small>
      </div>
    </div>
  )}

    <Card candidateArray = {candidateArray} giveVote = {giveVote}/>
  </div>;
};

export default index;
