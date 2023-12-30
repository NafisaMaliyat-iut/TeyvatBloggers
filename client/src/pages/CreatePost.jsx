import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { configHeader, configHeaderForFileUpload, newRequest } from '../utils/newRequest'

export const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: '',
        thumbnail: '',
        content: '',
        videos: [],
        images: []
    })
    const [message, setMessage] = useState('')

    const handleInputChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        console.log(name, files);
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: files,
        }));
    };

    const handleThumbnailChange = (e) => {
        console.log(name, files);
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]:e.target.values[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        setMessage('')
        try {
            const resPost = await newRequest.post('post/create-post',
                { title: formData.title, thumbnail: formData.thumbnail, content: formData.content, videos: formData.videos, images: formData.images }, configHeader);
            setMessage(resPost.data.message)
        } catch (error) {
            console.error('Error creating post:', error);
            // if (error.response.data.error[0]) {
            //     setMessage(error.response.data.error[0])
            // }
        }
    }

    return (
        <>
            <Navbar />
            <form onSubmit={handleSubmit}>
                <h1>Create A Post</h1>
                <p>
                    Share Your Mind With Fellow Teyvat Travelers. Please make sure not to post harmful content.
                    Remember, this platform is meant for positive and constructive discussions.
                    Let's create a welcoming community for everyone!
                </p>

                <hr />
                <span>{message}</span>
                <div>
                    <label htmlFor="title"><b>Title</b></label>
                    <input type="text" name="title" id="title" onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="thumbnail"><b>Thumbnail</b></label>
                    <input type="file" name="thumbnail" id="thumbnail" accept="image/jpg, image/gif, image/jpeg, image/png" onChange={handleThumbnailChange} required />
                </div>
                <div>
                    <label htmlFor="content"><b>Content</b></label>
                    <textarea name="content" id="content" onChange={handleInputChange} required />
                </div>
                <span>Attach any additional media you want your viewers to see</span>
                <div>
                    <label htmlFor='videos'><b>Videos</b></label>
                    <input
                        type="file" name="videos" id="videos" accept=".mp4, .mkv, .avi" onChange={handleFileChange} multiple
                    />
                </div>
                <div>
                    <label htmlFor='images'><b>Images</b></label>
                    <input type="file" name="images" id="images" accept="image/png, image/gif, image/jpeg, image/jpg" onChange={handleFileChange} multiple />
                </div>
                <hr />
                <div>
                    <button type="submit">Create Post</button></div>
            </form>
        </>
    )
}
