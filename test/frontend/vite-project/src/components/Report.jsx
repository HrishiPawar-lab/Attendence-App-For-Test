import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../App';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';


const Report = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const authCtx = useAuthContext();
    const { loggedInUser } = authCtx;
    const navigate = useNavigate();
    console.log(loggedInUser);

    useEffect(() => {
        if (!loggedInUser) {
            swal("Please login")
        }
    }, [])

    const handleNavigate = () => {
        navigate("/login");
    }


    function formatDate(isoDateString) {
        const date = new Date(isoDateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/attendence/${loggedInUser}`);
                setAttendanceData(response.data.attendance || []); // Handle cases where attendanceData is null or undefined
                setLoading(false);
            } catch (error) {
                console.error('Error fetching attendance data:', error);
                setError('Error fetching attendance data. Please try again later.');
                setLoading(false);
            }
        };

        fetchAttendanceData();
    }, [loggedInUser]); // Fetch attendance data when loggedInUser changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <>
                <div>
                    {error}
                </div>
                <button onClick={handleNavigate}>Login</button>
            </>
        )
            ;

    }

    return (
        <div>
            <h2 className='sub-heading'>Attendance Report</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Sign-in Time</th>
                        <th>Sign-out Time</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceData.map((record, index) => (
                        <tr key={index}>
                            <td>{formatDate(record.date)}</td>
                            {record.loginTime ? (
                                <td>{new Date(record.loginTime).getHours()}:{new Date(record.loginTime).getMinutes()}</td>
                            ) : (
                                <td>Absent</td>
                            )}
                            {record.logoutTime ? (
                                <td>{new Date(record.logoutTime).getHours()}:{new Date(record.logoutTime).getMinutes()}</td>
                            ) : (
                                <td>Absent</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Report;
