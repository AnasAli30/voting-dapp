import React from 'react'
import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
   
    <div>
         <ul>
            <li><Link to="/">Home</Link></li>
        <li><Link to="/RegisterVoter">RegisterVoter</Link></li>
        <li><Link to="/RagisterCandidate">RagisterCandidate</Link></li>
        <li><Link to="/GetVoterList">GetVoterList</Link></li>
        <li><Link to="/GetCandidateList">GetCandidateList</Link></li>
        <li><Link to="/ElectionCommision">ElectionCommision</Link></li>
    </ul>
    </div>
  )
}
