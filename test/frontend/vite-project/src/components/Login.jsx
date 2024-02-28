import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../App";
import swal from 'sweetalert';

const Login = () => {
    const authCtx = useAuthContext();
    const { handleLoggedInUser } = useAuthContext();
    console.log(authCtx)

    const [loginDetails, setLoginDetails] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/adminlogin")
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const loginUser = async (e) => {
        e.preventDefault();
        console.log("Login")
        try {
            const response = await axios.post("http://localhost:4000/api/v1/users/login", loginDetails);
            console.log(response.data);
            handleLoggedInUser(response.data);
            swal("Logged In")
            navigate('/attendence'); // Navigate to dashboard upon successful login
        } catch (error) {
            console.error("Login failed:", error.message);
            // Handle login failure (e.g., display error message)
        }
    };



    return (
        <form onSubmit={loginUser}>
            <div>
                <input type="text" name="username" onChange={handleChange} placeholder="Username" value={loginDetails.username} />
            </div>
            <div>
                <input type="password" name="password" onChange={handleChange} placeholder="Password" value={loginDetails.password} />
            </div>
            <button type="submit">Login</button>
            <button type="button" onClick={handleClick}>Login Via admin</button>
        </form>
    );
};

export default Login;
