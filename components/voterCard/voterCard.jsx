import React from "react";
import Image from "next/image";

// internal imports
import Style from "../card/card.module.css";
import images from "../../assets";
import voterCardStyle from "./voterCard.module.css";

const voterCard = ({ voterArray }) => {
  // console.log(voterArray);

  return (
    <div className={Style.card}>
      {voterArray.map((el, i) => (
        <div key = {i+1} className={Style.card_box}>
          <div className={Style.image}>
            <img src={el[2]} alt="Profile Image" />
          </div>

          <div className={Style.card_info}>
            <h2>
              {el[1]} #VID-{el[0].toNumber()}
            </h2>
            <p>
              Address: {el[3].slice(0, 5)}...{el[3].slice(-3)}
            </p>
            <p>
              Details: Voted={el[4].toString()} |--| voted-to-CID ={" "}
              {el[5].toNumber()}
            </p>

            <p className={voterCardStyle.vote_Status}>
              {el[4] == true ? "Already Voted" : "Not Voted"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default voterCard;

// return <div>ok</div>
// Function to find winner & updating the winner.