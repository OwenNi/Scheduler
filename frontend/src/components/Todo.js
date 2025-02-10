import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Todo.css';
import Timer from './Timer';

function App() {
    const [data, setData] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState(null); // State to store the selected job ID
    const [newJob, setNewJob] = useState(''); // State for new job input
    const [editJob, setEditJob] = useState(null); // State for editing a job
    const [selectedJob, setSelectedJob] = useState(null); // State to store the selected job for editing
    const [showCompleted, setShowCompleted] = useState(false); // Toggle to show completed rows
    const [searchTerm, setSearchTerm] = useState(''); // State for search input 

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = () => {
        axios
            .get('http://127.0.0.1:8000/api/todo/') // Replace with your actual backend endpoint
            .then((response) => {
                

                // Sort rows: Completed (status === 1) first, then others
                const sortedData = [...response.data].sort((a, b) => {
                    if (a.status === 1 && b.status !== 1) return -2;
                    if (a.status !== 1 && b.status === 1) return 2;
                    if (a.status === 0 && b.status === 0){
                        if (a.job < b.job) return -1;
                        else return 1;
                    }
                    return 0;
                });

                setData(sortedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const handleStartTimer = (id,job) => {
        setSelectedJobId(id);
        setSelectedJob(job);
    };

    const handleDeleteJob = (job) => {
        if (window.confirm(`Are you sure you want to delete this job : ${job.job} ?`)) {
            axios
                .delete(`http://127.0.0.1:8000/api/todo/${job.id}/`) // Replace with your actual delete endpoint
                .then(() => {
                    fetchJobs();
                })
                .catch((error) => {
                    console.error('Error deleting job:', error);
                });
        }
    };

    const handleEditJob = (job) => {
        setEditJob(job); 
    };

    const handleSaveEdit = () => {
        if (!editJob) return;
        console.log(editJob);
        axios
            .put(`http://127.0.0.1:8000/api/todo/${editJob.id}/`, editJob) // Replace with your actual update endpoint
            .then(() => {
                setEditJob(null); // Clear edit form
                fetchJobs(); // Refresh job list
            })
            .catch((error) => {
                console.error('Error updating job:', error);
            });
    };

    const handleCreateJob = () => {
        if (newJob.trim() === '') {
            alert('Job title cannot be empty!');
            return;
        }

        axios
            .post('http://127.0.0.1:8000/api/todo/', { job: newJob }) // Replace with your actual create endpoint
            .then(() => {
                setNewJob('');
                fetchJobs();
            })
            .catch((error) => {
                console.error('Error creating job:', error);
            });
    };

    const handleChangeJobStatus = (job) => {
        if (window.confirm(`Change completion status of this job : ${job.job} ?`)) {
            if (job.status === 0){
                job.status = 1;
            } else {
                job.status = 0;
            }
            axios
                .put(`http://127.0.0.1:8000/api/todo/${job.id}/`,job) // Replace with your actual Change enStatusdpoint
                .then(() => {
                    fetchJobs();
                })
                .catch((error) => {
                    console.error('Error completing job:', error);
            })
        }
    }

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            fetchJobs();
            return;
        }
        
        setData(data.filter(item =>
            typeof item.job === "string" && item.job.toLowerCase().includes(searchTerm.toLowerCase())
        ))
    }

    const filteredData = showCompleted ? data.filter(item => item.status === 0) : data;

    return (
        <div>
            <div className="table-container">
                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        value={newJob}
                        onChange={(e) => setNewJob(e.target.value)}
                        placeholder="Enter new job title"
                        style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}
                    />

                    <button
                        onClick={handleCreateJob}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Create Job
                    </button>

                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: '10px', fontSize: '16px', marginBottom: '10px' }}
                    />

                    <button
                        onClick={handleSearch}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Search
                    </button>

                    <button
                        onClick={fetchJobs}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: 'red',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Clear Search
                    </button>
                </div>

                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Job</th>
                            <th>Add Time</th>
                            <th>DDL</th>
                            <th>Status             
                                <div style={{ marginBottom: '15px' }}>
                                    <button
                                    onClick={(e) => {
                                        setShowCompleted(!showCompleted);
                                        e.target.blur(); // Removes focus from the button
                                    }}
                                    style={{
                                        padding: '10px 20px',
                                        fontSize: '16px',
                                        backgroundColor: showCompleted ? '#28a745' : 'red',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {showCompleted ? 'Show All' : 'Show Pending'}
                                </button>
                            </div>
                            </th>
                            {/* <th>Count</th> */}
                            <th>Start Timer</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.job}</td>
                                <td>{item.add_time || 'N/A'}</td>
                                <td>
                                    {item.ddl
                                        ? new Date(item.ddl).toLocaleString('en-CA', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false,
                                        }).replace(',', '')
                                        : 'N/A'}
                                </td>
                                <td className={item.status === 1 ? 'completed' : 'pending'}>
                                    {item.status === 1 ? 'Completed' : 'Pending'}
                                </td>
                                {/* <td>{item.count}</td> */}
                                <td>
                                    <button
                                        onClick={() => handleStartTimer(item.id, item.job)}
                                        style={{
                                            padding: '5px 10px',
                                            backgroundColor: '#28a745',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '3px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Start Timer
                                    </button>
                                </td>
                                <td>
                                <button                           
                                        onClick={() => {
                                            handleChangeJobStatus(item);
                                        }}
                                        style={{
                                            padding: '5px 10px',
                                            backgroundColor: item.status === 0 ? 'green' : 'red',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '3px',
                                            cursor: 'pointer',
                                            marginRight: '5px',
                                        }}
                                    >
                                        {item.status === 0 ? 'Mark as Completed' : 'Mark as Pending'}
                                    </button>
                                    <button
                                        onClick={() => handleEditJob(item)}
                                        style={{
                                            padding: '5px 10px',
                                            backgroundColor: '#ffc107',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '3px',
                                            cursor: 'pointer',
                                            marginRight: '5px',
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteJob(item)}
                                        style={{
                                            padding: '5px 10px',
                                            backgroundColor: '#dc3545',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '3px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/* Edit Job Form */}
            {editJob && (
                <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
                    <h2>Edit Job</h2>
                    <label>
                        Job Title:
                        <input
                            type="text"
                            value={editJob.job}
                            onChange={(e) => setEditJob({ ...editJob, job: e.target.value })}
                            style={{ padding: '10px', margin: '10px 0', width: '100%' }}
                        />
                    </label>
                    <label>
                        DDL:
                        <input
                            type="datetime-local"
                            value={editJob.ddl ? editJob.ddl.slice(0, 16) : ''} // Slice ensures the value matches 'yyyy-MM-ddTHH:mm' format
                            onChange={(e) => setEditJob({ ...editJob, ddl: e.target.value })}
                            style={{ padding: '10px', margin: '10px 0', width: '100%' }}
                        />

                    </label>
                    <label>
                        Status:
                        <select
                            value={editJob.status}
                            onChange={(e) => setEditJob({ ...editJob, status: parseInt(e.target.value, 10) })}
                            style={{ padding: '10px', margin: '10px 0', width: '100%' }}
                        >
                            <option value={0}>Pending</option>
                            <option value={1}>Completed</option>
                        </select>
                    </label>
                    <label>
                        Count:
                        <input
                            type="number"
                            value={editJob.count}
                            onChange={(e) => setEditJob({ ...editJob, count: e.target.value })}
                            style={{ padding: '10px', margin: '10px 0', width: '100%' }}
                        />
                    </label>
                    <button
                        onClick={handleSaveEdit}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#28a745',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginRight: '10px',
                        }}
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setEditJob(null)}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#dc3545',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Cancel
                    </button>
                </div>
            )}


            {/* Timer Component */}
            {selectedJobId && (
                <div style={{ marginTop: '20px' }}>
                    <Timer jobId={selectedJobId} job = {selectedJob} /> {/* Pass the selected job ID to Timer */}
                </div>
            )}
        </div>
    );
}

export default App;
