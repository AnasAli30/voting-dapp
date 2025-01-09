import React from 'react'

export default async function handleChainChange(SetWeb3state) {

    const chainidHex =await window.ethereum.request({
        "method":"eth_chainId"
    })
    const chainId = parseInt(chainidHex,16);
    SetWeb3state((prev)=>({...prev,chainId}))
}
