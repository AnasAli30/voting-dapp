import React from 'react'
import axios from 'axios';

export const uploadUserImage=async(namer,ager,genderr,statusr,contractr,file,selectedAccount,partyr)=> {
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
   form.append('name',namer );
   form.append('age',ager );
   form.append('gender',genderr );
   form.append('level',statusr );
   form.append('contractAdd',contractr );
   form.append('party',partyr );

    const res = await axios.post("http://localhost:3000/api/postImage",form,config)
  console.log(res)
    if(res.data.message == "successfull"){
        return true
    }
    return false;
}catch(e){
    console.log(e);
}

}
