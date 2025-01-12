import React from 'react'
import { Link } from 'react-router-dom'
import {toast} from "react-hot-toast"
import "./Navigation.css";
import { useWeb3Context } from '../../context/useWeb3Context';

export default function Navigation() {
  const {web3state} = useWeb3Context();
  const {userData} = web3state;
  console.log(userData)
  return (
   
    <nav>
         <ul>
            <li><Link to="/">Wallet</Link></li>
            <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/GetVoterList">GetVoterList</Link></li>
        <li><Link to="/GetCandidateList">GetCandidateList</Link></li>
       {userData.level==0? <li><Link to="/ElectionCommision">ElectionCommision</Link></li>:""}
        <li><Link to="/tokenMarketplace">tokenMarketplace</Link></li>
    </ul>
    </nav>
  )
}
