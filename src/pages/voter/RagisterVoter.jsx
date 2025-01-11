import React, { useRef, useState , useEffect } from 'react'
import {useWeb3Context} from "../../context/useWeb3Context"
import { uploadVoterImage } from '../../utils/uploadVoterImage';
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast"

export default function RagisterVoter() {
    const {web3state} = useWeb3Context()
    const [file,setFile] = useState(null);
    const {contractInstance,selectedAccount} = web3state;

    const name = useRef(null);
    const age = useRef(null);
    const gender = useRef(null);
       // Gender Enum Mapping
  const genderEnum = {
    NotSpecified: 0,
    Male: 1,
    Female: 2,
    Other: 3,
  };
  
  const token = localStorage.getItem("token");
  const navigateTo = useNavigate();
  
  useEffect(() => {
    if (!token) {
      navigateTo("/");
    }
  }, [navigateTo, token]);

    const handleSubmit=async(e)=>{
        try{
        e.preventDefault();
        const namer = name.current.value;
        const ager = age.current.value;
        const genderr = gender.current.value;

        const imageUploadStatus = await uploadVoterImage(file,selectedAccount)
        if (imageUploadStatus === true) {
            await contractInstance.registerVoter(namer, ager, genderr);
            name.current.value = "";
            age.current.value = "";
            gender.current.value = "";
            toast.success("Registration Successful");
            setFile(null);
          } else {
            name.current.value = "";
            age.current.value = "";
            gender.current.value = "";
            throw new Error("Voter Registration Failed!");
          }
        }catch(e){
          name.current.value = "";
          age.current.value = "";
          gender.current.value = "";
          toast.error("Registration failed");
        }
       


    }
    return(<div>
        <br></br>
       <form onSubmit={handleSubmit}>
           <label>Name: </label>
               <input type="text" ref={name}></input>
          
           <label>Age: </label>
               <input type="text" ref={age}></input>
          
   
           <label>Gender:</label>
           <select ref={gender} required>
             <option value={genderEnum.NotSpecified}>Not Specified</option>
             <option value={genderEnum.Male}>Male</option>
             <option value={genderEnum.Female}>Female</option>
             <option value={genderEnum.Other}>Other</option>
           </select>
           <br></br>
           <button type="submit">Register</button>
       </form>
       <br></br>
       <input 
           type="file" 
           accept="image/*"
           onChange={(e) => setFile(e.target.files[0])} 
           required
         />
     </div>)
}
