import React, { useRef, useState } from 'react'
import "./Registration.css"
import ElectionCommision from '../ElectionCommision/ElectionCommision'
import { useWeb3Context } from '../../context/useWeb3Context';
import { uploadUserImage } from '../../utils/uploadUserImage';
import {ethers} from "ethers"
import abi from "../../constant/abi.json"
import {contractBytecode} from "../../constant/bytecode"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Footer from '../../component/footer/Footer';

export default function Registration() {
    const name = useRef(null);
    const age = useRef(null)
    const status = useRef(null)
    const contract = useRef(null)
    const gender = useRef(null)
    const party = useRef(null)
    const [file,setFile] = useState(null);
    const {web3state} = useWeb3Context()
    const {selectedAccount,signer} = web3state;
    const navigateTo = useNavigate()
   
    const [stat,setStat] = useState(0);
    const genderEnum = {
        NotSpecified: 0,
        Male: 1,
        Female: 2,
        Other: 3,
      };
    const statusEnum = {
        ElectionCommision: 0,
        Voter: 1,
        Candidate: 2,
      };
        const [selectedGender, setSelectedGender] = useState(genderEnum.NotSpecified);
      
        const handleChange = (e) => {
          setSelectedGender(e.target.value);
        };

        async function deployContract() {
          const factory = new ethers.ContractFactory(abi, contractBytecode, signer);
          try {
            const contract = await factory.deploy();
            toast.promise(
              (async () => {
                await contract.waitForDeployment();
              })(),
              {
                loading: "Deploying contract...",
                success: "Contract Deployed!",
                error: "Failed to deploy the contract.",
              }
            );
            
            return contract.target;
          } catch (err) {
            throw new Error(err);
            console.error("Deployment failed:", err);
          }
        }

        const handleSubmit = async(e)=>{
            e.preventDefault();
            const namer = name.current.value;
            const ager = age.current.value;
            const genderr = gender.current.value;
            const statusr = status.current.value;
            const contractr = contract?.current?.value;
            const partyr = party?.current?.value
            console.log(namer,ager,genderr,statusr,contractr);
            if(statusr==1){
              try{
              const contractInstance = new ethers.Contract(contractr,abi,signer)
            const data =   await contractInstance.registerVoter(namer, ager, genderr);
              await uploadUserImage(namer,ager,genderr,statusr,contractr,file,selectedAccount,partyr);
              toast.success("Registration successfull")
              navigateTo("/profile")
            }
              catch(e){
                if(e.reason){
                  console.log(e)
                  toast.error(e.reason)
                }else{
                  console.log(e)
                  toast.error("Error occured ! try again")
                }
              }
            }else if(statusr==2){
              try{
              const contractInstance = new ethers.Contract(contractr,abi,signer)
              await contractInstance.registerCandidate(namer, partyr, ager, genderr);
              await uploadUserImage(namer,ager,genderr,statusr,contractr,file,selectedAccount,partyr);
              toast.success("Registration successfull")
              navigateTo("/profile")
              }catch(e){
                if(e.reason){
                  console.log(e)
                  toast.error(e.reason)
                }else{
                  console.log(e)
                  toast.error("Error occured ! try again")
                }

              }

            }else{
              try{
            const ca =  await deployContract();
            await uploadUserImage(namer,ager,genderr,statusr,ca,file,selectedAccount,partyr);
            toast.success("Registration successfull")
            navigateTo("/profile")
          }catch(e){
            if(e.reason){
              console.log(e.error)
              toast.error(e.reason)
            }else{
              console.log(e)
              toast.error("Registration failed , Try again!!")
            }
          }
            
              
          
            }
           
        }

  return (
    <div className='Registration'>
       
        <form action="" onSubmit={handleSubmit}>
        <h3>Registration Form</h3>
     
            <input ref={name} type="text" placeholder='Name' required/>
            <input type="number" ref={age} placeholder="Age" min="18" required />
            
            {stat!=0?<>
           <>
           <input ref={contract} type="text" placeholder='Contract address provided by Election Commision' required/>
           </>
        </>:""}
        {stat==2?<>
            <input ref={party} type="party" placeholder='Party'/>
        </>:""}
        <label htmlFor="file-upload" style={{
        backgroundColor: '#007bff',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'inline-block'
      }}>
        Choose Img
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ display: 'none'}} required
      />
       {file && <p style={{color:"black",fontWeight:"bold"}}>Selected File: {file.name}</p>}
            <select value={selectedGender} style={{marginTop:"16px"}} ref={gender} onChange={handleChange} required>
      {selectedGender === genderEnum.NotSpecified && (
        <option value={genderEnum.NotSpecified} disabled>
         Select Your Gender
        </option>
      )}
      <option value={genderEnum.Male}>Male</option>
      <option value={genderEnum.Female}>Female</option>
      <option value={genderEnum.Other}>Other</option>
    </select>

            <select ref={status} className='select' required onChange={(e)=>{setStat(e.target.value)}}>
          <option value={statusEnum.ElectionCommision}>Election Commision</option>
          <option value={statusEnum.Voter}>Voter</option>
          <option value={statusEnum.Candidate}>Candidate</option>
        </select>
       
        <button type="submit">Register</button>
        </form>
        <Footer></Footer>
    </div>
  )
}
