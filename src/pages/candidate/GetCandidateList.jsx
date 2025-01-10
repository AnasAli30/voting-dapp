import React, { useEffect } from 'react'
import { useWeb3Context } from '../../context/useWeb3Context'

export default function GetCandidateList() {
     const {web3state} = useWeb3Context();
     const {contractInstance} = web3state;

    useEffect(()=>{
        const fetchCandidateList = async()=>{
            try{
                const CandidateList = await contractInstance.getCandidateList();
                console.log(CandidateList)
            }catch(error){
                console.log(error)
            }
        }

        contractInstance && fetchCandidateList()

    },[contractInstance])

  return (
    <div>GetCandidateList</div>
  )
}
