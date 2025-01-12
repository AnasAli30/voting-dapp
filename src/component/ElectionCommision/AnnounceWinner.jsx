import React, { useRef } from 'react'
import { useWeb3Context } from '../../context/useWeb3Context';
import {toast} from "react-hot-toast"

export default function AnnounceWinner() {
    const {web3state} = useWeb3Context();
    const {contractInstance} = web3state;

    const handleSubmit=async(e)=>{
      try{
        e.preventDefault();
      let data = await contractInstance.announceVotingResult();
      console.log(data);
      toast.success("Winner Accounced")
      }catch(e){
        toast.error("Error:fetching Voting Result")
        console.log(e)
      }


    }
  return (
    
    <div>
        <form action="" onClick={handleSubmit}>
        <input style={{backgroundColor:"lightgreen",fontWeight:"bold",cursor:"pointer"}} type="submit" value="Annoce voting result" />
        </form>
        </div>
  )
}
