import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import AnnounceWinner from "../../component/ElectionCommision/AnnounceWinner";
import DisplayResult from "../../component/ElectionCommision/DisplayResult";
import EmergencyDeclare from "../../component/ElectionCommision/EmergencyDeclare";
import VotingStatus from "../../component/ElectionCommision/VotingStatus";
import VotingTimePeriod from "../../component/ElectionCommision/VotingTimePeriod";
import { toast } from "react-hot-toast";
import "./ElectionCommission.css";


const ElectionCommision = () => {
  const token = localStorage.getItem("token");
  const navigateTo = useNavigate();
   const [status,setStatus] = useState(null);

  useEffect(() => {
    if (!token) {
      navigateTo("/");
    }
  }, [navigateTo, token]);

  return (
    <div className="election-commission-container">
      <div className="result">
      <DisplayResult/>
      </div>
      <div className="election-component">
        <h2>Voting Status</h2>
        <VotingStatus status={status} setStatus={setStatus}/>
      </div>

      {status=="Not Started"? <div className="election-component">
        <h2>Voting Time Period</h2>
        <VotingTimePeriod />
      </div>:""}

      {status=="In Progress"?
      <>
      <div className="divider"></div>

      <div className="election-component announce-winner-section">
        <h2>Announce Winner</h2>
        <AnnounceWinner />
      </div>

      <div className="divider"></div>

      <div className="election-component emergency-section">
        <h2>Emergency Declare</h2>
        <EmergencyDeclare />
      </div></>:""}
    </div>
  );
};

export default ElectionCommision;