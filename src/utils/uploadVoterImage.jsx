import React from 'react'
import axios from 'axios';

export const uploadVoterImage=async(file,selectedAccount)=> {
    try{
    const token = localStorage.getItem("token");
   const config = {
    headers:{
        "x-access-token":token
    }
   }
   const form = new FormData();
   form.append("file",file);
   form.append('accountAddress',selectedAccount );
form.append('imageName', file.name);
    const res = await axios.post("https://voting-dapp-server-zdgg.onrender.com/api/postVoterImage",form,config)
  console.log(res)
    if(res.data.message == "successfull"){
        return true
    }
    return false;
}catch(e){
    console.log(e);
}

}
