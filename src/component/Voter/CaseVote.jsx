import React, { useRef } from 'react'
import { useWeb3Context } from '../../context/useWeb3Context';

export default function CaseVote() {
  const {contractInstance} = useWeb3Context();
  const voterId = useRef(null);
  const candidateId = useRef(null);

    const handleSubmit=async(e)=>{
      try{
        e.preventDefault();
      let data = await contractInstance.castVote(
voterId.current.value,candidateId.current.value);
      console.log(data);
      }catch(e){
        console.log(e)
      }


    }

  return (
    <div>
        <h3>Cast Vote</h3>
        <form action="" onSubmit={handleSubmit}>
            <input ref={voterId} type="text" placeholder='voterId'/> ref={voterId}
            <input ref={candidateId} type="text" placeholder='CandidateId'/>
        </form>
    </div>
  )
}
