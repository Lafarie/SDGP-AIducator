import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function PopularPosts() {
  const [popularPostsData, setPopularPostsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/get/popular-threads`);
        const data = await response.json();
        setPopularPostsData(data.message);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="popular-topics">
      <h2>Popular Posts</h2>
      {popularPostsData.map((post) => (
        <div key={post.ThreadID}>
          <Link to={`/post/${post.ThreadID}`}>
            <h3>{post.Title}</h3>
          </Link>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default PopularPosts;
