import React, { useEffect, useState } from 'react'
import { useWeb3Context } from '../../context/useWeb3Context'
import VotingTimePeriod from './VotingTimePeriod';


export default function VotingStatus({ status,setStatus}) {
   
    const {web3state} = useWeb3Context();
    const {contractInstance} = web3state;
        useEffect(()=>{
        const fetchWinner= async()=>{
           const sta =  await contractInstance.getVotingStatus();
           const statetime = await contractInstance.startTime();
           const endTime = await contractInstance.endTime()
           console.log(statetime.toString(),endTime)
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
    <> <div className='status' style={{color:"black"}}>
        {status?<>{status}</>:<></>}
    </div>
  
    </>
  )
    
   
}
