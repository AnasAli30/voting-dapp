import React from 'react'

export const handleChainChange=async(SetWeb3state) =>{

    const chainidHex =await window.ethereum.request({
        "method":"eth_chainId"
    })
    const chainId = parseInt(chainidHex,16);
    SetWeb3state((prev)=>({...prev,chainId}))
}
