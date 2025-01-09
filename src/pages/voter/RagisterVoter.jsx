import React, { useRef } from 'react'
import {useWeb3Context} from "../../context/useWeb3Context"

export default function RagisterVoter() {
    const {contractInstance} = useWeb3Context();
    console.log(contractInstance)

    const name = useRef(null);
    const age = useRef(null);
    const gender = useRef(null);

    const handleSubmit=async(e)=>{
        try{
        e.preventDefault();
        const namer = name.current.value;
        const ager = age.current.value;
        const genderr = gender.current.value;

        await contractInstance?.registerVoter(namer,Number(ager),genderr).then((data)=>{
            console.log(data);
            console.log("ragisterdone");
        }).catch((e)=>{
            console.log(e)
        })
        console.log(namer,ager,genderr,partyr);
        }catch(e){

        }
       


    }
  return (
    <div>
        <h2>Voter Registration Form</h2>
        <form action="" onSubmit={handleSubmit}>
            <input ref={name} type="text" placeholder='Name' />
            <input ref={age}type="number" placeholder='Age' />
            <input ref={gender}type="text" placeholder='Gender'/>
            <input type="submit" value="" />
        </form>
    </div>
  )
}
