import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Add a CSS file for styling

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from the backend
        axios.get('http://127.0.0.1:8000/api/todo/') // Replace with your actual backend endpoint
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="navbar-brand">Job Tracker</div>
                <ul className="navbar-menu">
                    <li><a href="/">Home</a></li>
                    <li><a href="/add-job">Add Job</a></li>
                    <li><a href="/completed-jobs">Completed Jobs</a></li>
                </ul>
            </nav>

            {/* Table Section */}
            <div className="table-container">
                <h1>Job List</h1>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Job</th>
                            <th>Add Time</th>
                            <th>DDL</th>
                            <th>Status</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.job}</td>
                                <td>{item.add_time || 'N/A'}</td>
                                <td>{item.ddl || 'N/A'}</td>
                                <td className={item.status === 1 ? 'completed' : 'pending'}>
                                    {item.status === 1 ? 'Completed' : 'Pending'}
                                </td>
                                <td>{item.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
