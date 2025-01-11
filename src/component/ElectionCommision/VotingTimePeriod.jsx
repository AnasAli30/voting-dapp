import React, { useRef, useEffect, useState } from 'react';
import { useWeb3Context } from '../../context/useWeb3Context';

export default function VotingTimePeriod() {
  const { contractInstance } = useWeb3Context();
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
      let data = await contractInstance.setVotingPeriod(startTime, endTime);
      console.log('Transaction successful:', data);
    } catch (e) {
      console.error('Transaction failed:', e);
    }
  };

  return (
    <div>
      <h3>Set Voting Time Period</h3>

      <form onSubmit={handleSubmit}>
        <label>Start Date & Time:</label>
        <input
          ref={stime}
          type="datetime-local"
          defaultValue={currentDateTime}
          min={currentDateTime}
          required
        />

        <label>End Date & Time:</label>
        <input
          ref={etime}
          type="datetime-local"
          defaultValue={currentDateTime}
          min={currentDateTime}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
