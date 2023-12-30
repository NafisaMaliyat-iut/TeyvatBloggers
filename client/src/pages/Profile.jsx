import React, { useState } from 'react'
import Navbar from '../components/Navbar';

const Profile = () => {
    const [editmode, setEditmode] = useState(false);
    const handleClick = (e) => {
        e.preventDefault();
        if (editmode) {//is true
            //check if password fields shob empty naki ekta empty 
            //handlesubmit
            console.log("editmode true")
        } else {
            console.log("Editmode off")
            setEditmode(true)
        }
    }
    return (
        <>
        <Navbar/>
            <h1>Your Profile</h1>
            <form>
                <img className='profile-img' src={'https://images.unsplash.com/photo-1590067007526-d3f13779cdb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2VuZXJpY3xlbnwwfHwwfHx8MA%3D%3D'} />
                <div>

                    {editmode && (<><label htmlFor="img"><b>Profile Picture</b></label>
                        <input type="file" name="img" id="img" /></>)}
                </div>
                <div>
                    <label htmlFor="email"><b>Email</b></label>
                    <span>asdad</span>
                </div>
                <div>
                    <label htmlFor="name"><b>Username</b></label>
                    {editmode ? (<><input type="text" name="name" id="name" value="asda" /></>) : <span>asdad</span>}
                </div>
                {editmode && (<><div>
                    <label htmlFor="currentPassword"><b>Current Password</b></label>
                    <input type="password" name="currentPassword" id="currentPassword" />
                </div>
                    <div>
                        <label htmlFor="newPassword"><b>New Password</b></label>
                        <input type="password" name="newPassword" id="newPassword" />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword"><b>Confirm Password</b></label>
                        <input type="password" name="confirmPassword" id="confirmPassword" />
                    </div></>)}
                <hr />
                <div><button onClick={handleClick}>{editmode ? "Save Changes" : "Edit Details"}</button></div>
            </form>
        </>
    )
}

export default Profile