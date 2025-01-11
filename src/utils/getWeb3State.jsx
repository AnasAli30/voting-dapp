import React from 'react'
import {ethers} from "ethers"
import axios from 'axios'
import abi from "../constant/abi.json"

export async function getWeb3State() {
    try{
    if(!window.ethereum){
        throw new Error("metamask not installed")
    }

    const accounts = await window.ethereum.request({
        "method":"eth_requestAccounts"
    })

    const selectedAccount = accounts[0];

    const chainidHex =await window.ethereum.request({
        "method":"eth_chainId"
    })

    const chainId = parseInt(chainidHex,16);

    const provider = new ethers.BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();

    const ca = "0x3e0FEEBE40869723128368cC4564C5D6cec60fb8"

    const message =`Welcome to Voting Dapp!

Click to sign in and accept the Terms of Service  and Privacy Policy.

This request will not trigger a blockchain transaction or cost any gas fees.

Wallet address: ${selectedAccount}`

    const signature = await signer.signMessage(message);
   const dataSign = {
    signature
   }
   const res = await axios.post(`http://localhost:3000/api/authentication?accountAddress=${selectedAccount}`,dataSign);
   console.log(res.data.token);
   localStorage.setItem("token",res.data.token)
    const contractInstance = new ethers.Contract(ca,abi,signer)
    return {contractInstance,selectedAccount,chainId,signer,provider}

}catch(e){
        console.log(e)
    }



  return 
}
