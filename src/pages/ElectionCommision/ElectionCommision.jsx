import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnnounceWinner from "../../component/ElectionCommision/AnnounceWinner";
import DisplayResult from "../../component/ElectionCommision/DisplayResult"
import EmergencyDeclare from "../../component/ElectionCommision/EmergencyDeclare";
import VotingStatus from "../../component/ElectionCommision/VotingStatus"
import VotingTimePeriod from "../../component/ElectionCommision/VotingTimePeriod"
import {toast} from "react-hot-toast"

const ElectionCommision = ()=>{
  const token = localStorage.getItem("token")
    const navigateTo = useNavigate()
    useEffect(()=>{
      if(!token){
        navigateTo("/")
      }
    },[navigateTo,token])
  return(
    <>
     <VotingTimePeriod/> 
     <br></br>
     {/* <AnnounceWinner/>
     <br></br>
     <EmergencyDeclare/> */}
    </>
  )
}
export default ElectionCommision;