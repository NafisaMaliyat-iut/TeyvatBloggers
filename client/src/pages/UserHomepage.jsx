import React from 'react'
import Navbar from '../components/Navbar'
import PostFeed from './PostFeed';

const postsData = [
    {
        title: 'Post 1',
        src: 'https://images.unsplash.com/photo-1590067007526-d3f13779cdb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2VuZXJpY3xlbnwwfHwwfHx8MA%3D%3D',
        content: 'Content for Post 1',
        media: ['https://images.unsplash.com/photo-1590067007526-d3f13779cdb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2VuZXJpY3xlbnwwfHwwfHx8MA%3D%3D','https://images.unsplash.com/photo-1590067007526-d3f13779cdb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2VuZXJpY3xlbnwwfHwwfHx8MA%3D%3D','https://images.unsplash.com/photo-1590067007526-d3f13779cdb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2VuZXJpY3xlbnwwfHwwfHx8MA%3D%3D']
    },
    {
        title: 'Post 1',
        src: 'https://images.unsplash.com/photo-1590067007526-d3f13779cdb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2VuZXJpY3xlbnwwfHwwfHx8MA%3D%3D',
        content: 'Content for Post 1',
    },
    {
        title: 'Post 1',
        src: 'https://images.unsplash.com/photo-1590067007526-d3f13779cdb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2VuZXJpY3xlbnwwfHwwfHx8MA%3D%3D',
        content: 'Content for Post 1',
    },
    {
        title: 'Post 1',
        src: 'https://images.unsplash.com/photo-1590067007526-d3f13779cdb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2VuZXJpY3xlbnwwfHwwfHx8MA%3D%3D',
        content: 'Content for Post 1',
    },{
        title: 'Post 1',
        src: 'https://images.unsplash.com/photo-1590067007526-d3f13779cdb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2VuZXJpY3xlbnwwfHwwfHx8MA%3D%3D',
        content: 'Content for Post 1',
    },{
        title: 'Post 1',
        src: 'https://images.unsplash.com/photo-1590067007526-d3f13779cdb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2VuZXJpY3xlbnwwfHwwfHx8MA%3D%3D',
        content: 'Content for Post 1',
    },
];

const UserHomepage = () => {
    return (
        <>
            <h2>Welcome user!</h2>
            <Navbar />
            <PostFeed postsData={postsData}/>
        </>
    )
}

export default UserHomepage