import React from 'react'
import {ethers} from "ethers"
import axios from 'axios'
import abi from "../constant/abi.json"
import toast from 'react-hot-toast'

export async function getWeb3State() {

    const BASE_CHAIN_ID = "0x2105";


    try{
    if(!window.ethereum){
        window.open("https://metamask.io/", '_blank', 'noopener,noreferrer');
        throw new Error("metamask not installed")
    }

    const accounts = await window.ethereum.request({
        "method":"eth_requestAccounts"
    })

    const selectedAccount = accounts[0];

    const chainidHex =await window.ethereum.request({
        "method":"eth_chainId"
    })

    if (chainidHex !== BASE_CHAIN_ID) {
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: BASE_CHAIN_ID }],
            });
            toast.success("Switched to Base Mainnet");
        } catch (switchError) {
            if (switchError.code === 4902) {
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            chainId: BASE_CHAIN_ID,
                            chainName: "Base Mainnet",
                            nativeCurrency: {
                                name: "Ethereum",
                                symbol: "ETH",
                                decimals: 18,
                            },
                            rpcUrls: ["https://developer-access-mainnet.base.org"],
                            blockExplorerUrls: ["https://basescan.org"],
                        },
                    ],
                });
                toast.success("Base Mainnet added and switched");
            } else {
                throw new Error("Failed to switch to Base Mainnet");
            }
        }
    }


    const chainId = parseInt(chainidHex,16);
    console.log(chainidHex)

    const provider = new ethers.BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();
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
   
    const contractInstance = null;
    return {contractInstance,selectedAccount,chainId,signer,provider}

}catch(e){
    if(e.message){
        toast.error(e.message.slice(0,20))
    }
        console.log(e.message)
    }



  return 
}
