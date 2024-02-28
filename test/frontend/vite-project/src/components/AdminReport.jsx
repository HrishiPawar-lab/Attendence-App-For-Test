import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminReport = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            console.log('Admin logged in');
            navigate('/admin-dashboard');
        } else {
            console.log('Invalid credentials');
            alert('Invalid credentials');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" value={username} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
            <button type="submit">Login Via Admin</button>
        </form>
    );
};

export default AdminReport;
