import React, { useState, useEffect } from 'react';

function Timer() {
    const [minutes, setMinutes] = useState(''); // Input value for minutes
    const [timeLeft, setTimeLeft] = useState(0); // Time left in seconds
    const [isRunning, setIsRunning] = useState(false); // Timer status

    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000); // Decrease by 1 every second
        } else if (timeLeft === 0) {
            setIsRunning(false); // Stop the timer when it reaches 0
        }
        return () => clearInterval(timer); // Cleanup interval
    }, [isRunning, timeLeft]);

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
            <h1>Countdown Timer</h1>
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
            {isRunning && <h2>{formatTime(timeLeft)}</h2>}
        </div>
    );
}

export default Timer;
