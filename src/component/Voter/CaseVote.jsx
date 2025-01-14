import React, { useRef } from 'react'
import { useWeb3Context } from '../../context/useWeb3Context';
import toast from 'react-hot-toast';

export default function CaseVote({id}) {
  const {web3state} = useWeb3Context()
  const {contractInstance,userData,userDataCa} = web3state;
    const voteCandidate=async(e)=>{
      try{
        e.preventDefault();
        console.log(e)
        const voterId = userDataCa.voterId;
        const candidateId = id;
        console.log(voterId,candidateId)
        await toast.promise(
           contractInstance.castVote(voterId, candidateId),
          {
            loading: "Submitting your vote...",
            success: "Vote cast successfully! 🗳️",
            error: "Failed to cast vote. Please try again.",
          }
        );
      }catch(error){
        toast.error(error.reason)
        console.error(error)
      }


    }

  return (
    <div>
      <form onSubmit={voteCandidate}>
        <button  type="submit">Cast Vote </button>
    </form>
    </div>
  )
}
