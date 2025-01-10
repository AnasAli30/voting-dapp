import React, { useEffect, useState } from 'react'
import { useWeb3Context } from '../../context/useWeb3Context'

export default function GetVoterList() {
  const {web3state} = useWeb3Context()
     const {contractInstance} = web3state;
     const [list,setList] = useState([])

    useEffect(()=>{
        const fetchVoterList = async()=>{
            try{
                const voterList = await contractInstance.getVoterList();
                setList(voterList)
            }catch(error){
                console.log(error)
            }
        }

        contractInstance && fetchVoterList()

    },[contractInstance])
  return (
    <ul>
{list.map((candidateList, index) => (
  <li key={index}>
    Name: {candidateList.name}, 
    party: {candidateList.party}, 
    Age: {candidateList.age.toString()}
  </li>
))}
</ul>
  )
}
