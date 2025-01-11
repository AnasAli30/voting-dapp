import React, { useRef, useState } from 'react'
import "./Registration.css"
import ElectionCommision from '../ElectionCommision/ElectionCommision'
import { useWeb3Context } from '../../context/useWeb3Context';
import { uploadUserImage } from '../../utils/uploadUserImage';

export default function Registration() {
    const name = useRef(null);
    const age = useRef(null)
    const status = useRef(null)
    const contract = useRef(null)
    const gender = useRef(null)
    const party = useRef(null)
    const [file,setFile] = useState(null);
    const {web3state} = useWeb3Context()
    console.log(web3state)
    const {selectedAccount} = web3state;
    console.log(selectedAccount)

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

        const handleSubmit = async(e)=>{
            e.preventDefault();
            const namer = name.current.value;
            const ager = age.current.value;
            const genderr = gender.current.value;
            const statusr = status.current.value;
            const contractr = contract.current.value;
            const partyr = party.current.value
            console.log(namer,ager,genderr,statusr,contractr);
            await uploadUserImage(namer,ager,genderr,statusr,contractr,file,"0x9d54a1832bddd1f1f0b3721b934b4f3ac1ec369d",partyr);
        }

  return (
    <div className='Registration'>
        <h3>Registration Form</h3>
        <form action="" onSubmit={handleSubmit}>
            <input type="file" onChange={(e)=>{setFile(e.target.files[0])}} />
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
            <select value={selectedGender} ref={gender} onChange={handleChange} required>
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
    </div>
  )
}
