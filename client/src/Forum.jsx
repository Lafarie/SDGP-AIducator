import React, { useEffect, useState } from "react";
import "./App.css";
import "./Forum.css";
import SearchIcon from "./Images/SearchIcon.svg";
import ForumIcon from "./Images/ForumIcon.svg";
import Navbar from "./component/Navbar";

function Forum() {
  const [forums, setForums] = useState([]);
  const [currentID, setCurrentID] = useState("");
  const [popularPosts, setPopularPosts] = useState([]);

  useEffect(() => {
    fetch(`/api/get/forum?forumId=all`)
      .then((res) => res.json())
      .then((data) => {
        setForums(data.message);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    fetchPopularPosts(); // Fetch popular posts when component mounts
  }, []);

  const fetchPopularPosts = async () => {
    try {
      const response = await fetch(`/api/get/popular-threads`);
      const data = await response.json();
      setPopularPosts(data.message);
      console.log(data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="forum-page-top-bar">
        <h1 className="forum-title">Forum</h1>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button>
          <img src={SearchIcon} alt="Search" />
        </button>
      </div>
      <div className="forum-container">
        <div className="forums-list">
          {forums.map((forum) => (
            <div
              className="forum"
              key={forum.ForumID}
              onClick={() => setCurrentID(forum.ForumID)}
            >
              <div className="img">
                <img src={ForumIcon} alt="" />
              </div>
              <div className="forum-short-details">
                <h2>{forum.Name}</h2>
                <p>{forum.Description}</p>
              </div>
              <div className="forum-status">
                <div>
                  <p>{"Questions"}</p>
                  <p>{"Answers"}</p>
                </div>
                <div>
                  <p>{forum.questions}</p>
                  <p>{forum.answers}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="side-bar">
          {currentID ? (
            forums.map((forum) => {
              if (forum.ForumID === currentID) {
                return (
                  <div key={forum.ForumID}>
                    <div className="img">
                      <img src="" alt="" />
                    </div>
                    <div className="forum-long-details">
                      <h2>{forum.Name}</h2>
                      <p>{forum.Description}</p>
                    </div>
                    <div className="side-bar-button">
                      <button id="join-button" onClick={() =>(window.location.href ="/forum-page/" + forum.ForumID + "/" + forum.Name)}>
                        Join
                      </button>
                    </div>
                  </div>
                );
              }
              return null;
            })
          ) : (
            <>
              <h2>Popular Topics</h2>
              <div className="popular-topics">
                {popularPosts.map((post) => (
                  <div key={post.ThreadID} >
                    <h3 onClick={ ()=>window.location.href = "/post/" + post.ThreadID}>{post.Title}</h3>
                    <hr />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Forum;
