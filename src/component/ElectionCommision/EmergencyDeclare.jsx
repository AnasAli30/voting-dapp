import React, { useRef } from 'react'
import { useWeb3Context } from '../../context/useWeb3Context';

export default function EmergencyDeclare() {
   const {web3state} = useWeb3Context();
      const {contractInstance} = web3state;

    const handleSubmit=async(e)=>{
      try{
        e.preventDefault();
      let data = await contractInstance.emergencyStopVoting();
      console.log(data);
      }catch(e){
        console.log(e)
      }


    }
  return (
    
    <div>
        <form action="" onClick={handleSubmit}>
        <input style={{backgroundColor:"red",fontWeight:"bold"}} type="submit" value="Emergency Declare" />
        </form>
        </div>
  )
}
