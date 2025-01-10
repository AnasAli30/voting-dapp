import React from 'react'
import {ethers} from "ethers"
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
    const contractInstance = new ethers.Contract(ca,abi,signer)
    return {contractInstance,selectedAccount,chainId}
 



}catch(e){
        console.log(e)
    }



  return 
}
