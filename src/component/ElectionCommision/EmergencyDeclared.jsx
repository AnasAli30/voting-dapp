import React, { useRef } from 'react'
import { useWeb3Context } from '../../context/useWeb3Context';

export default function EmergencyDeclared() {
    const {contractInstance} = useWeb3Context();

    const handleSubmit=async()=>{
      try{
      let data = await contractInstance.emergencyStopVoting();
      console.log(data);
      }catch(e){
        console.log(e)
      }


    }
  return (
    
    <div>
        <form action="" onClick={handleSubmit}>
        <input type="submit" value="EmergencyDeclared" />
        </form>
        </div>
  )
}
