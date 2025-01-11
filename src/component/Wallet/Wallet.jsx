import { useEffect } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-hot-toast"
const Wallet = ()=>{
 const token = localStorage.getItem("token");
 const {handleWallet,web3state} = useWeb3Context()
 const {selectedAccount} = web3state
 const navigateTo = useNavigate()

 useEffect(()=>{
    const fetch=async()=>{
        const config = {
            headers:{
                "x-access-token":token
            }
        }
     const res = await axios.post("http://localhost:3000/api/check",{ accountAddress: selectedAccount },config)
 console.log(res)
        navigateTo('/RagisterCandidate')
    }

    selectedAccount&& fetch();
 },[selectedAccount])

 return <button onClick={handleWallet}>Connect Wallet</button>
}
export default Wallet;