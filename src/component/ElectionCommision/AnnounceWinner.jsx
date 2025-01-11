import React, { useRef } from 'react'
import { useWeb3Context } from '../../context/useWeb3Context';
import {toast} from "react-hot-toast"

export default function AnnounceWinner() {
    const {contractInstance} = useWeb3Context();

    const handleSubmit=async()=>{
      try{
      let data = await contractInstance.announceVotingResult();
      console.log(data);
      }catch(e){
        toast.error("Error:fetching Voting Result")
        console.log(e)
      }


    }
  return (
    
    <div>
        <form action="" onClick={handleSubmit}>
        <input type="submit" value="Annoce voting result" />
        </form>
        </div>
  )
}
