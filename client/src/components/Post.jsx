import React from 'react'

const Post = ({title, src, content}) => {
  const getFileType = (url) => {
    const extension = url.split('.').pop().toLowerCase();
    if (['mp4', 'webm', 'ogg'].includes(extension)) {
      return 'video';
    }
    return 'image';
  };

  const renderMedia = () => {
    const fileType = getFileType(src);
    console.log(fileType)

    if (fileType === 'video') {
      return <video controls width="300" src={src} />;
    } else if (fileType === 'image') {
      return <img src={src} alt={title} />;
    }

    return null;
  };

  const handleLike=()=>{

  }
  return (
    <>
    <h2>{title}</h2>
    {renderMedia()}
    <p>{content}</p>
    <div><button onClick={handleLike}>Like</button></div>
    </>
  )
}

export default Post