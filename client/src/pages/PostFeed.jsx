import React, { useState } from 'react';
import Post from '../components/Post';

const postsPerPage = 4;

const PostFeed = ({postsData}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postsData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {currentPosts.map((post, index) => (
        <Post key={index} title={post.title} src={post.src} content={post.content} />
      ))}

      <div>
        {Array.from({ length: Math.ceil(postsData.length / postsPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default PostFeed;
