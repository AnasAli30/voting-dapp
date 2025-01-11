import { useEffect } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast"
const Wallet = ()=>{
 
 const {handleWallet,web3state} = useWeb3Context()
 const {selectedAccount} = web3state
 const navigateTo = useNavigate()

 useEffect(()=>{
    if(selectedAccount){
        navigateTo('/RagisterCandidate')
    }
 },[selectedAccount])

 return <button onClick={handleWallet}>Connect Wallet</button>
}
export default Wallet;