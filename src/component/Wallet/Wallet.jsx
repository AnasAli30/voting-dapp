import { useEffect } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {ethers} from "ethers"
import abi from "../../constant/abi.json"
import {toast} from "react-hot-toast"
const Wallet = ()=>{
 const token = localStorage.getItem("token");
 const {handleWallet,web3state,setWeb3state} = useWeb3Context()
 const {selectedAccount,signer} = web3state
 const navigateTo = useNavigate()

 useEffect(()=>{
    const fetch=async()=>{
        const config = {
            headers:{
                "x-access-token":token
            }
        }
        try{
     const res = await axios.post("http://localhost:3000/api/check",{ accountAddress: selectedAccount },config)
    
     console.log(res)

 const responseData =res.data.data;
 const contractInstance = new ethers.Contract(responseData.contractAdd,abi,signer)
 setWeb3state((prev)=>({...prev,contractInstance:contractInstance,userData:responseData}))
 navigateTo('/Profile')
 toast.success("Login succesfull");
}catch(e){
    if(e.status==404){
        navigateTo('/register')
        toast.error("You r not registed")
    }
 }
       
    }

    selectedAccount&& fetch();
 },[selectedAccount])

 return <button onClick={handleWallet}>Connect Wallet</button>
}
export default Wallet;