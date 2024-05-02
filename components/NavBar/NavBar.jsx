import React, {useState,useContext} from "react";
import Image from "next/image";
import Link from "next/link";
import {AiFillUnlock, AiFillLock} from "react-icons/ai"

// internal imports:
import {VotingContext} from "../../context/Voter";
import Style from "./NavBar.module.css";
// import loadConfig from "next/dist/server/config";
import loading from "../../assets/loading-2.gif"
import Button from "../Button/Button";


const NavBar = () => {
  const {connectWallet,error,currentAccount} = useContext(VotingContext);

  const [openNav, setOpenNav] = useState(true);

  const openNavigation = ()=>{
    if(openNav){
      setOpenNav(false)
    }else if(!openNav){
      setOpenNav(true)
    }
  }


  return (<div className = {Style.navbar}>
  {error === "" ? (
      ""
    ): (
      <div className = {Style.message__box}>
        <div className={Style.message}>
          <p> {error} </p>
        </div>
      </div>
    )}

    <div className = {Style.navbar_box}>
      <div className = {Style.title}>
        <Link href = {{pathname: '/'}}>
          <Image src = {loading} alt="logo" width={80} height={80} />
        </Link>
      </div>

      <div className={Style.connect}>
        {currentAccount ? (
          <div>
          <div className = {Style.connect_flex}>
            <button onClick={()=> openNavigation()}>
              `{currentAccount.slice(0,6)} ... {currentAccount.slice(-5)}`
            </button>

            {currentAccount && (
              <span>{openNav ? (
                <AiFillUnlock onClick = {()=> openNavigation()}/>
              ):
                <AiFillLock onClick = {()=> openNavigation()}/>
              }</span>
            )}
          </div>
            {
              openNav && (
                <div className = {Style.navigation}>
                  <p>
                    <Link href={{pathname:"/"}}> HOME </Link>
                  </p>
                  <p>
                    <Link href={{pathname:"/candidate-regisration"}}> Candiate Registration </Link>
                  </p>
                  <p>
                    <Link href={{pathname:"/allowed-voters"}}> Voter List</Link>
                  </p>
                </div>
              )
            }


          </div>
        ) :(
          <button onClick = {()=>connectWallet()}>Connect Wallet</button>
        )}

      </div>
    </div>
  </div>
  );
  
};

export default NavBar;
