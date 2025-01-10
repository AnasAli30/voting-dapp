import React, { useEffect, useState } from 'react'
import { useWeb3Context } from '../../context/useWeb3Context'


export default function VotingStatus() {
    const [status,setStatus] = useState(null);
    const {web3state} = useWeb3Context();
    const {contractInstance} = web3state;
        useEffect(()=>{
        const fetchWinner= async()=>{
           const sta =  await contractInstance.getVotingStatus();
           if(sta==0){
            setStatus("Not Started");
           }else if(sta==1){  
            setStatus("In Progress")

           }else{
   setStatus("Ended")
           }
        }
        contractInstance && fetchWinner();
        },[web3state])
  return (
    <div>
        VotingStatus:{status?<>{status}</>:<></>}
    </div>
  )
}
