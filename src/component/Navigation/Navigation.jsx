import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWeb3Context } from '../../context/useWeb3Context';
import "./Navigation.css";

export default function Navigation() {
  const { web3state } = useWeb3Context();
  const { userData } = web3state;
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className={isMobile && isOpen ? 'active' : ''}>
      {isMobile && (
        <div className="menu-toggle" onClick={toggleMenu}>☰</div>
      )}
      <ul className={`nav-list ${isMobile && isOpen ? 'active' : ''}`}>
        <li className="nav-item"><Link className="nav-link" to="/profile" onClick={() => setIsOpen(false)}>Profile</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/GetVoterList" onClick={() => setIsOpen(false)}>Voter List</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/GetCandidateList" onClick={() => setIsOpen(false)}>Candidate List</Link></li>
        {userData?.level === 0 && (
          <li className="nav-item nav-item-election">
            <Link className="nav-link" to="/ElectionCommision" onClick={() => setIsOpen(false)}>Election Commission</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
