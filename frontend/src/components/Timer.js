import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Timer({ jobId,job }) {
    const [minutes, setMinutes] = useState(''); // Input value for minutes
    const [timeLeft, setTimeLeft] = useState(0); // Time left in seconds
    const [isRunning, setIsRunning] = useState(false); // Timer status

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Add leading zero
        const day = String(today.getDate()).padStart(2, '0'); // Add leading zero
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000); // Decrease by 1 every second
        } else if (timeLeft === 0 && isRunning) {
            setIsRunning(false); // Stop the timer when it reaches 0
            alert('Time is up!');
            sendTimeToBackend(minutes); // Send the total time to the backend
        }
        return () => clearInterval(timer); // Cleanup interval
    }, [isRunning, timeLeft]);

    // Function to send total time to the backend
    const sendTimeToBackend = async (totalTime) => {
        try {
            console.log(jobId);
            console.log(totalTime);
            console.log(getCurrentDate());
            const response = await axios.post('http://127.0.0.1:8000/api/timerecords/', {
                record: jobId,
                focus_time: totalTime,
                occur_time: getCurrentDate(),
            });

            console.log('Time updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating time:', error);
        }
    };

    // Convert seconds to MM:SS format
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const handleStart = () => {
        const seconds = parseInt(minutes, 10) * 60;
        if (!isNaN(seconds) && seconds > 0) {
            setTimeLeft(seconds);
            setIsRunning(true);
        } else {
            alert('Please enter a valid number of minutes!');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <div style={{ marginBottom: '20px' }}>
                {!isRunning && (
                    <>
                        <input
                            type="number"
                            value={minutes}
                            onChange={(e) => setMinutes(e.target.value)}
                            placeholder="Enter minutes"
                            style={{ padding: '10px', fontSize: '16px', width: '200px' }}
                        />
                        <button
                            onClick={handleStart}
                            style={{
                                padding: '10px 20px',
                                fontSize: '16px',
                                marginLeft: '10px',
                                backgroundColor: '#007bff',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            Start
                        </button>
                    </>
                )}
            </div>
            {isRunning && (<div><h2>Current Job: {job}</h2> 
            <h3>Time Remaining: {formatTime(timeLeft)}</h3></div>)}
        </div>
    );
}

export default Timer;
