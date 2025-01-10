import React, { useEffect } from 'react'
import { useWeb3Context } from '../../context/useWeb3Context'

import { useNavigate } from 'react-router-dom';

export default function Wallet() {
  const {handleWallet,web3state} = useWeb3Context()
  console.log(web3state)
  console.log(handleWallet)
  const {selectedAccount} = web3state;

  const navigateTo = useNavigate();

  useEffect(()=>{
    if(selectedAccount){
      navigateTo("/RegisterVoter")
    }
  },[web3state])


  return (
    <div>
       <button onClick={handleWallet}>Connect Wallet</button>
    </div>
  )
}
