import React, { useEffect } from 'react'
import { useWeb3Context } from '../../context/useWeb3Context'

export default function GetCandidateList() {
  const {contractInstance} = useWeb3Context();

    useEffect(()=>{
        const fetchCandidateList = async()=>{
            try{
                const CandidateList = await contractInstance.getCandidateList;
                console.log(CandidateList())
            }catch(error){
                console.log(error)
            }
        }

        contractInstance && fetchVoterList()

    },[contractInstance])

  return (
    <div>GetCandidateList</div>
  )
}
