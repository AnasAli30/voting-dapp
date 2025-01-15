import React from 'react'

import axios from "axios"

export const uploadCandidateImage=async(file)=> {
    try{
    const form  = new FormData();
    form.append("file",file);
    const token = localStorage.getItem("token");
    const config = {
        headers:{
            "x-access-token":token
        }
    }
    const res = await axios.post("https://voting-dapp-server-zdgg.onrender.com/api/postCandidateImage",form,config)
    if(res.data.message == "successfull"){
        return true
    }
    return false;
    console.log(res);}
    catch(e){
        console.log(e)
    }
 
}
