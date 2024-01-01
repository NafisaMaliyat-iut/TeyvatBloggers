import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { configHeader, newRequest } from '../utils/newRequest'

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [message, setMessage] = useState('')
    const [usernames, setUsernames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsernames = async () => {
            try {
                const resUsernames = await newRequest.get('auth/getUsernames');
                setUsernames(resUsernames.data);
            } catch (error) {
                console.error('Error fetching usernames:', error);
            }
        };

        fetchUsernames();
    }, []);


    const handleInputChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        console.log(formData)
        if (formData.confirmPassword !== formData.password) {
            setMessage('**Passwords do not match!**')
        } else if (usernames.includes(formData.username)) {
            setMessage('**Username is taken!**')
        } else {
            try {
                const resRegister = await newRequest.post('auth/register',
                    { username: formData.username, password: formData.password, email: formData.email }, configHeader);
                setMessage(resRegister.data.message)
                navigate('/login')
            } catch (error) {
                console.error('Error registering:', error);
                if (error.response.data.error[0]) {
                    setMessage(error.response.data.error[0])
                }
            }
        }
    }

    const googleAuth = async ()=>{
        try {
        const oauthRes = await newRequest.get('auth/google');
        console.log(oauthRes)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr />
                <h3><b>{message}</b></h3>
                <div>
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="email" name="email" id="email" required onChange={handleInputChange} />
                </div>

                <div>
                    <label htmlFor="username"><b>Username</b></label>
                    <input type="text" name="username" id="username" required onChange={handleInputChange} />
                </div>
                <span>Note: Your username has to be unique</span>
                <div>
                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" name="password" id="password" pattern=".{8,}" required onChange={handleInputChange} /></div>
                <div>
                    <label htmlFor="confirmPassword"><b>Confirm Password</b></label>
                    <input type="password" name="confirmPassword" id="confirmPassword" pattern=".{8,}" required onChange={handleInputChange} /></div>
                <span>Your password should contain minimum 8 characters</span>
                <hr />

                <span>Already a user? <Link to="/login">Click here to login</Link></span>
                <div><button type="submit">Register</button></div>
            </form>
            <div><button onClick={googleAuth}>Sign In With Google</button></div>
        </>
    )
}

export default Register