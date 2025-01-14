import { useEffect, useState } from "react";
import { Web3Context } from "./Web3Context";
import {getWeb3State} from "../utils/getWeb3State";
import {handleAccountChange} from "../utils/handleAccountChange";
import {toast} from "react-hot-toast"
import {handleChainChange} from "../utils/handleChainChange";


export default function Web3Provider({children}) {
    const [web3state, setWeb3state] = useState({
    contractInstance:null,
    selectedAccount:null,
    chainId:null,
    signer:null,
    provider:null
    })

    const handleWallet = async()=>{
      const {contractInstance,selectedAccount,chainId,signer,provider} = await getWeb3State();
      setWeb3state({contractInstance,selectedAccount,chainId,signer,provider})
    }

    useEffect(()=>{
      if(window.ethereum){
      window.ethereum.on("accountsChanged",()=>handleAccountChange(setWeb3state));
      window.ethereum.on("chainChanged",()=>handleChainChange(setWeb3state));}
  
    },[])


  return (
   <>
   <Web3Context.Provider value={{web3state,handleWallet,setWeb3state}}>
    {children}
   </Web3Context.Provider>
   </>
  )
}
