import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../App';
import axios from 'axios';

const Attendence = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate();
    const authCtx = useAuthContext();
    const { loggedInUser } = useAuthContext();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const toggleSignInOut = async () => {
        try {
            if (!isLoggedIn) {
                // User is signing in
                const response = await axios.post(`http://localhost:4000/api/v1/attendence/signin`, {
                    loginTime: new Date(),
                    userId: loggedInUser
                });
                setIsLoggedIn(true);
                console.log(response);
            } else {
                // User is signing out
                const response = await axios.post(`http://localhost:4000/api/v1/attendence/signout`, {
                    logoutTime: new Date(),
                    userId: loggedInUser
                });
                setIsLoggedIn(false);
                console.log(response);
            }
        } catch (error) {
            console.error("Error toggling sign-in/sign-out:", error.message);
            // Handle error as needed
        }
    };


    // Function to handle navigation to the report page
    const handleViewReport = () => {
        navigate("/report"); // Navigate to report page
    };

    return (
        <div>
            <span>{date.toLocaleTimeString()}</span>
            <div>
                <button onClick={toggleSignInOut}>
                    {isLoggedIn ? "Sign Out" : "Sign In"}
                </button>
            </div>
            <span>
                <button onClick={handleViewReport}>View Report</button>
            </span>
        </div>
    );
};

export default Attendence;
