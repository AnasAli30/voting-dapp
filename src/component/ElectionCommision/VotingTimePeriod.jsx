import React, { useRef } from 'react'
import { useWeb3Context } from '../../context/useWeb3Context';

export default function VotingTimePeriod() {
    const {contractInstance} = useWeb3Context();
    const stime = useRef(null);
    const etime = useRef(null);

    const handleSubmit=async()=>{
      const startTime = stime.current.value;
      const endTime = etime.current.value;
      try{
      let data = await contractInstance.setVotingPeriod(startTime,endTime)
      console.log(data);
      }catch(e){
        console.log(e)
      }


    }
  return (
    
    <div>
        <h3>VotingTimePeriod</h3>

        <form action="">
            <input ref={stime} type="text" placeholder='start Time'/>
            <input ref={etime}type="text" placeholder='end Time'/>
            <input type="submit" value="" />
        </form>
        
        </div>
  )
}
