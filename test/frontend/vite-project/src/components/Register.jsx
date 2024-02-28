import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const Register = () => {
    const navigate = useNavigate();
    const [registerDetails, setRegisterDetails] = useState({
        username: "",
        password: "",
        email: "",
        phone: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterDetails((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/v1/users/register", registerDetails);
            console.log(response.data);
            if (response.data.username) {
                swal("User Registered")
                navigate("/login")
            } else {
                swal("User Not Registered")
            }
        } catch (error) {
            console.error("Registration failed:", error.message);
            swal("Registration failed")

        }
    };

    return (
        <div>
            <h2 className="sub-heading">Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="username" onChange={handleChange} placeholder="Username" value={registerDetails.username} required />
                </div>
                <div>
                    <input type="password" name="password" onChange={handleChange} placeholder="Password" value={registerDetails.password} required />
                </div>
                <div>
                    <input type="email" name="email" onChange={handleChange} placeholder="Email" value={registerDetails.email} required />
                </div>
                <div>
                    <input type="number" name="phone" onChange={handleChange} placeholder="Phone" value={registerDetails.phone} required />
                </div>
                <button type="submit">Register</button>
                <span className="text-center mt-2">
                    Already a user
                    <Link to="/login">
                        log in
                    </Link>
                </span>
            </form>
        </div>
    );
};

export default Register;
