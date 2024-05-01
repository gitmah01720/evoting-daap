import React from "react";
import Image from "next/image";

// internal imports:
import images from "../../assets";
// import Style from "../card/card"
import Style from "../card/card.module.css";
import Button from "../Button/Button";

const card = ({ candidateArray, giveVote }) => {
  console.log("cards");
  console.log(candidateArray);
  return (
    <div className={Style.card}>
      {candidateArray.map((el, i) => (
        <div className={Style.card_box}>
          <div className={Style.image}>
            <img src={el[1]} alt="Profile Image" />
          </div>

          <div className={Style.card_info}>
            <h2>
              <p>
                {el[0]} #CID-{el[4].toNumber()}
              </p>
            </h2>
            <p>
              Address: {el[6].slice(0, 5)}...{el[6].slice(-3)}
            </p>

            <p className={Style.total}>Total Votes</p>
          </div>

          <div className={Style.card_vote}>
            <p>{el[2].toNumber()}</p>
          </div>

          <div className={Style.card_button}>
            <button
              onClick={() => giveVote({ id: el[4].toNumber(), address: el[6] })}
            >
              Give Vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default card;
