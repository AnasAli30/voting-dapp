import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWeb3Context } from '../../context/useWeb3Context';
import "./Navigation.css";

export default function Navigation() {
  const { web3state } = useWeb3Context();
  const { userData } = web3state;
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav>
      <button className="menu-toggle" onClick={toggleMenu}>☰</button>
      <ul className={`nav-list ${isOpen ? 'active' : ''}`}>
        {/* <li className="nav-item"><Link className="nav-link" to="/">Wallet</Link></li> */}
        <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/GetVoterList">Voter List</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/GetCandidateList">Candidate List</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/tokenMarketplace">Token Marketplace</Link></li>
        {userData?.level === 0 && (
          <li className="nav-item nav-item-election">
            <Link className="nav-link" to="/ElectionCommision">Election Commission</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
