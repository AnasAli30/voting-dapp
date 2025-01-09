import React from 'react'

export default async function handleAccountChange(SetWeb3state) {
    const accounts = await window.ethereum.request({
        "method":"eth_requestAccounts"
    })

    const selectedAccount = accounts[0];
    SetWeb3state((prev)=>({...prev,selectedAccount}));
}
