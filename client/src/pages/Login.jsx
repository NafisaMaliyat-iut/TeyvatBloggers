import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { configHeader, newRequest } from '../utils/newRequest';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        console.log(formData);
        try {
            const resLogin = await newRequest.post('auth/login', { password: formData.password, email: formData.email }, configHeader);
            console.log(resLogin)
            setMessage(resLogin.data.message);
            navigate('/home')
        } catch (error) {
            console.error('Error logging in:', error);
            if (error.response.data.error[0]) {
                setMessage(error.response.data.error[0]);
            } else {
                setMessage('Something went wrong.');
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <p>Please fill in this form to log in to your account.</p>
                <hr />
                <h3><b>{message}</b></h3>
                <div>
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="email" name="email" id="email" required onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" name="password" id="password" required onChange={handleInputChange} />
                </div>
                <hr />
                <span>Don't have an account? <Link to="/register">Click here to register</Link></span>
                <div><button type="submit">Login</button></div>
            </form>
        </>
    );
};

export default Login;
