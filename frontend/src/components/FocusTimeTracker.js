import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FocusTimeTracker() {
    const [data, setData] = useState([]); // Store the raw API data
    const [groupBy, setGroupBy] = useState('month'); // Grouping criterion: 'month' or 'day'
    const [processedData, setProcessedData] = useState({}); // Processed data grouped by month/day

    // Fetch data from the API
    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/timerecords/') // Replace with your API endpoint
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Process data whenever `data` or `groupBy` changes
    useEffect(() => {
        const groupedData = groupData(data, groupBy);
        setProcessedData(groupedData);
    }, [data, groupBy]);

    // Group data by month or day
    const groupData = (data, criterion) => {
        return data.reduce((acc, record) => {
            const date = new Date(record.occur_time); // Convert date string to Date object
            const key =
                criterion === 'month'
                    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}` // YYYY-MM
                    : date.toISOString().split('T')[0]; // YYYY-MM-DD

            if (!acc[key]) {
                acc[key] = 0;
            }
            acc[key] += record.focus_time; // Sum up the focus time
            return acc;
        }, {});
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Focus Time Tracker</h1>
            <div style={{ marginBottom: '20px' }}>
                <label>
                    Group By:{' '}
                    <select
                        value={groupBy}
                        onChange={(e) => setGroupBy(e.target.value)}
                        style={{
                            padding: '5px',
                            fontSize: '16px',
                            borderRadius: '5px',
                            marginLeft: '10px',
                        }}
                    >
                        <option value="month">Month</option>
                        <option value="day">Day</option>
                    </select>
                </label>
            </div>

            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    textAlign: 'left',
                    marginTop: '20px',
                }}
            >
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '10px' }}>
                            {groupBy === 'month' ? 'Month' : 'Day'}
                        </th>
                        <th style={{ border: '1px solid #ddd', padding: '10px' }}>Total Focus Time (minutes)</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(processedData).map(([key, total]) => (
                        <tr key={key}>
                            <td style={{ border: '1px solid #ddd', padding: '10px' }}>{key}</td>
                            <td style={{ border: '1px solid #ddd', padding: '10px' }}>{total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FocusTimeTracker;
