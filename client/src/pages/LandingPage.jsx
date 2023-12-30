import React from 'react'
import Post from '../components/Post'
import { Link } from 'react-router-dom'

const LandingPage = () => {
    return (
        <>
            <div>Welcome To Tevyat Bloggers</div>
            <hr />
            <Link to="/register"> <button type="button">Register</button></Link>
            <Link to="/login"><button type="button">Login</button></Link>
            <Post title={'Test Post Title'} src={"https://images.unsplash.com/photo-1590067007526-d3f13779cdb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2VuZXJpY3xlbnwwfHwwfHx8MA%3D%3D"} content={"Testing contenttttttttttttttttttttttttttttttttttttttttttttt"} />
        </>
    )
}

export default LandingPage