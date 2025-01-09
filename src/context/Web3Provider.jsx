import { useEffect, useState } from "react";
import { Web3Context } from "./Web3Context";
import {getWeb3State} from "../utils/getWeb3State";
import {handleAccountChange} from "../utils/handleAccountChange";

import {handleChainChange} from "../utils/handleChainChange";


export default function Web3Provider({children}) {
    const [web3state, setWeb3state] = useState({
        contractInstance:null,
        selectedAccount:null,
        chainId:null,
    })

    const handleWallet = async()=>{
      const {contractInstance,selectedAccount,chainId} = await getWeb3State();
      setWeb3state({contractInstance,selectedAccount,chainId} );
    }

    useEffect(()=>{
      window.ethereum.on("accountsChanged",()=>handleAccountChange(setWeb3state));
      window.ethereum.on("chainChanged",()=>handleChainChange(setWeb3state));
  
    },[])


  return (
   <>
   <Web3Context.Provider value={web3state}>
    {children}
   </Web3Context.Provider>
   <button onClick={handleWallet}>Connect Wallet</button>
   </>
  )
}
