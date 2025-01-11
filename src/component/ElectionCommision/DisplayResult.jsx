import React, { useEffect, useState } from 'react'
import { useWeb3Context } from '../../context/useWeb3Context'
import {ethers} from "ethers"

export default function DisplayResult() {
   const {web3state} = useWeb3Context();
   const [winner,setWinner] = useState(null);
   const {contractInstance} = web3state;
    useEffect(()=>{
    const fetchWinner= async()=>{
       const winner =  await contractInstance.winner();
       if(ethers.ZeroAddress != winner){
        setWinner(winner);
       }
    }

    contractInstance && fetchWinner();
    },[web3state])
  return (
    <div>{winner?<div>Winner:{winner}</div>:<div>
        No winner Accounced Yet</div>}</div>
  )
}
