import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const handleLogout=()=>{
        localStorage.clear();
    }
    return (
        <>
            <ul id="navbar">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/create-post">Create A Post</Link></li>
                <li><Link to="/profile">View Profile</Link></li>
                <li onClick={handleLogout}><Link>Logout</Link></li>
            </ul>
        </>
    )
}

export default Navbar