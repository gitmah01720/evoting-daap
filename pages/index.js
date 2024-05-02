import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Countdown from "react-countdown";

// internal imports
import { VotingContext } from "../context/Voter";
import Style from "../styles/index.module.css";
import Card from "../components/card/card";
import image from "../assets/candidate-1.jpg";

// connectWallet,
// voterLength,
// voterArray,
// voterAddress,
// getAllVoterdata,
// candidateAddress,
// const Completionist = () => {
//   console.log(candidateArray)
// }

// Calculate winner

const index = () => {
  const {
    checkIfWalletConnected,
    giveVote,
    candidateLength,
    getAllCandidatedata,
    currentAccount,
    candidateArray,
    voterLength,
    getAllVoterdata,
  } = useContext(VotingContext);

  useEffect(() => {
    checkIfWalletConnected();
  });
  // getAllVoterdata();

  const calculateWinner = (candidateArray) => {
    let maxVotes = 0;
    let winnerName = "";
    let winner = null;

    // Loop through the candidate array
    candidateArray.forEach((candidate) => {
      if (candidate[2].toNumber() > maxVotes) {
        maxVotes = candidate[2].toNumber();
        winner = candidate;
      }
      console.log(candidate[0]);
    });
    console.log("fn");

    // return {};
    if (winner) {
      winnerName = winner[0];
    }
    
    return winnerName.toString();
  };

  // countdown to vote ending.
  return (
    <div className={Style.home}>
      {currentAccount && (
        <div className={Style.winner}>
          <div className={Style.winner_info}>
            <div className={Style.candidate_list}>
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

          <div className={Style.winner_message}>
              <Countdown date={Date.now() + 420000}>
            <small>
                {candidateArray.length > 0 && (
                  <>
                    {calculateWinner(candidateArray) ? (
                      <p>
                        Winner:{" "}
                        <small>{calculateWinner(candidateArray)}</small>
                      </p>
                    ) : (
                      "No Winner"
                    )}
                  </>
                )}
            </small>
              </Countdown>
          </div>
        </div>
      )}

      <Card candidateArray={candidateArray} giveVote={giveVote} />
    </div>
  );
};

export default index;

{
  /* <small>
  <Countdown date={Date.now() + 10000}></Countdown>
</small>; */
}
