import React, { useRef, useEffect, useState } from 'react';
import { useWeb3Context } from '../../context/useWeb3Context';
import toast from 'react-hot-toast';

export default function VotingTimePeriod() {
  const { web3state } = useWeb3Context();
  const {contractInstance} =web3state;
  const stime = useRef(null);
  const etime = useRef(null);
  const [currentDateTime, setCurrentDateTime] = useState('');

  // Set current date and time in the correct format
  useEffect(() => {
    const now = new Date();
    const formattedNow = now.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
    setCurrentDateTime(formattedNow);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startTime = new Date(stime.current.value).getTime() / 1000;
    const endTime = new Date(etime.current.value).getTime() / 1000;

    if (isNaN(startTime) || isNaN(endTime)) {
      console.log('Invalid date input');
      return;
    }

    if (startTime >= endTime) {
      console.log('Start time must be before end time');
      return;
    }

    try {
      console.log(startTime,endTime)
      let data = await contractInstance.setVotingPeriod(startTime, endTime);
      console.log(data)
      toast.success("Voting Has Been Started")
      console.log('Transaction successful:', data);
    } catch (e) {
      if(e.message){
      toast.error(e.reason)}
      console.log(e)
      console.error('Transaction failed:', e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label style={{color:"black",fontWeight:"bold"}}>Start Date & Time:</label>
        <input
          ref={stime}
          type="datetime-local"
          defaultValue={currentDateTime}
          min={currentDateTime}
          required
        />

        <label style={{color:"black",fontWeight:"bold"}}>End Date & Time:</label>
        <input
          ref={etime}
          type="datetime-local"
          defaultValue={currentDateTime}
          min={currentDateTime}
          required
        />

        <button type="submit">Start Voting</button>
      </form>
    </div>
  );
}
