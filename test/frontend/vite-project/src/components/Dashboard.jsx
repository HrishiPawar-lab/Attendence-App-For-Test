import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/users/user-logs');
                // console.log(response.data.userLogs)
                setLogs(response.data.userLogs);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user logs:', error.message);
                setError('Failed to fetch user logs. Please try again later.');
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>User Logs</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Date</th>
                        <th>Login Time</th>
                        <th>Logout Time</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => {
                        console.log(log);
                        return <>
                            <tr>
                                <td>{log.user}</td>
                                <td>{log.user}</td>
                                <td>{
                                    new Date(log.attendance[0]?.loginTime).getHours()
                                }
                                :
                                    {
                                        new Date(log.attendance[0]?.loginTime).getMinutes()
                                    }
                                </td>
                                <td>
                                    {
                                        new Date(log.attendance[0]?.logoutTime).getHours()
                                    }
                                </td>
                            </tr>
                        </>
                    })}
                </tbody>
            </table>
        </div >
    );
};

export default Dashboard;
