import React from 'react'
import { useContext } from 'react'
import { Web3Context } from '../context/Web3Context'
import Web3Provider from '../context/Web3Provider'

export default function Dummy() {
    const {contractInstance,selectedAccount,chainId} = useContext(Web3Context);
    console.log(contractInstance,selectedAccount,chainId)
  return (
    <div>D</div>
   
  )
}
