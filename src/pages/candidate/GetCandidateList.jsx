import { useEffect } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast"
import "./GetCandidateList.css"
import CaseVote from "../../component/Voter/CaseVote";

const GetCandidateList =  ()=>{
  const {web3state} = useWeb3Context()
  const {contractInstance,userData} = web3state;
  console.log(userData)
  const [candidateList,setCandidateList] = useState([])
  const token = localStorage.getItem("token")
  const navigateTo = useNavigate()


  useEffect(()=>{
    if(!token || !web3state.contractInstance){
      navigateTo("/")
    }
  },[navigateTo,token])
  
  useEffect(()=>{
    const fetchCandidateList = async()=>{
      try{
        const candidateList = await contractInstance.getCandidateList();
        setCandidateList(candidateList)
      }catch(error){
        toast.error("Error: Getting Candidate List")
        console.error(error)
      }
    }
    contractInstance && fetchCandidateList()
  },[contractInstance])

  return ( <div className="candidate-list-table-container">
    {candidateList.length!==0?(<table className="candidate-list-table">
        <thead>
            <tr>
            <th className="candidate-list-table-header">Candidate id</th>
            <th className="candidate-list-table-header">Address</th>
                <th className="candidate-list-table-header">Name</th>
                <th className="candidate-list-table-header">Party</th>
                <th className="candidate-list-table-header">Votes</th>
                <th className="candidate-list-table-header">Photo</th>
            </tr>
        </thead>
        <tbody>
            {candidateList.map((candidate, index) => (
                <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                   <td className="candidate-list-table-data">{candidate.candidateId.toString()}</td>
                    <td className="candidate-list-table-data">{candidate.candidateAddress}
                      
                   {userData?.level==1?<div className="case-vote-button"><CaseVote id={candidate.candidateId}></CaseVote></div>:"" }
                    
                    </td>
                 
                    <td className="candidate-list-table-data">{candidate.name}</td>
                    <td className="candidate-list-table-data">{candidate.party}</td>
                    <td className="candidate-list-table-data">{String(candidate.votes)}</td>
                    <td className="candidate-list-table-data">  
                      <img 
                       width={"70px"} 
                       height={"70px"} 
                       src={`http://localhost:3000/images/user/${candidate.candidateAddress}.jpg`}
                      />    
                       
                    </td>
                    
                    
                </tr>
                
               
            ))}
        </tbody>
    </table>):(<p>No Candidates Found!</p>)}
</div>);
}
export default GetCandidateList;