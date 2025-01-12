import React, { useEffect, useState } from 'react';
import './Profile.css';
import { useWeb3Context } from '../../context/useWeb3Context';
import { use } from 'react';

const Profile = () => {
    const {web3state,setWeb3state} = useWeb3Context();
    const {userData,contractInstance,userDataCa} = web3state;

    useEffect(()=>{
      const fectch=async()=>{
        if(userData.level==1){
   const data = await contractInstance.getVoter(userData.accountAddress)
   setWeb3state((prev)=>({...prev,userDataCa:data[0]}))

  }else if(userData.level==2){
    const data = await contractInstance.getCandidate(userData.accountAddress)
    setWeb3state((prev)=>({...prev,userDataCa:data[0]}))
   console.log(data);
  }
      }

      userData && fectch()

    },[userData])

  const genderLabel = userData.gender === 1 ? 'Male' : 'Female';
  const statusEnum = {
    ElectionCommision: 0,
    Voter: 1,
    Candidate: 2,
  };
  const levelLabel = Object.keys(statusEnum).find(
    key => statusEnum[key] === userData.level
  );

  return (
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <img
             src={`http://localhost:3000/images/user/${userData.accountAddress}.jpg`}
              alt="Profile"
              className="profile-image"
            />
            <h2>{userData.name}</h2>
            <p className="profile-role">{levelLabel}</p>
           {userDataCa?.votes!=undefined?<p className='votes'><strong>Votes:</strong>{userDataCa?.votes?.toString()}</p>:""}
          </div>
          <div className="profile-details">
            <p><strong>Age:</strong> {userData.age}</p>
            <p><strong>Gender:</strong> {genderLabel}</p>
            {userData.party!="undefined"?<p><strong>Party:</strong> {userData.party}</p>:""}
            <p><strong>Contract Address:</strong> <span className="highlight-address">{userData.contractAdd}</span></p>
          <p><strong>Account Address:</strong> <span className="highlight-address">{userData.accountAddress}</span></p>
          </div>
        </div>
      </div>
    );
  };
export default Profile;