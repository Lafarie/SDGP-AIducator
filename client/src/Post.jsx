import React, { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import Logo from "./Images/logo.svg";
import "./Forum.css";
import { Link } from "react-router-dom";

function Post() {
  const [threads, setThreads] = useState([]);
  const [forumID, setforumID] = useState("");
  const [forumName, setforumName] = useState("");
  const [threadID, setThreadID] = useState("");
  const [firstThread, setFirstThread] = useState("")

  useEffect(() => {
    let url = location.pathname;
    let forumID = url.split("/")[2];
    let forumName = url.split("/")[3];
    let threadID = url.split("/")[4];

    // console.log(forumName)
    setThreadID(threadID);
    setforumID(forumID);
    setforumName(forumName.replace(/%20/g, ` `));

    fetch(`/api/get/thread?threadId=${threadID}`)
    .then((res) => res.json())
    .then((data) => {
      setFirstThread(data.message);
      console.log(data.message);
    })

    fetch(`/api/get/posts?threadId=${threadID}`)
      .then((res) => res.json())
      .then((data) => {
        setThreads(data.message);
        console.log(data.message);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Render loading state while fetching data
  if (!threads || !firstThread) {
    return (
      <>
        <Navbar />
        <p>Loading...</p>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <title>{forumName}</title>
        <div className="forum-page-top-bar">
          <h1 className="forum-title">{forumName}</h1>
          <Link to={"/create/post/" + threadID} id="create-post-button">
            Reply Post
          </Link>
        </div>
        <div className="forum-page">
          <div className="forum-page-posts">
            {/* <div className="forum-page-bar">
                            <h2>Votes & Reply</h2>
                            <h3>Questions</h3>
                            <h3>Tags</h3>
                        </div> */}
            {firstThread.map((post) => (
              <div className="thread-post" key={post.PostID+1}>
                <div className="post-voting">
                  <img src={Logo} alt="" /> <p>0</p>
                  <img src={Logo} alt="" />
                </div>
                <div className="post-container">
                  <div className="post-title-bar">
                    <h2>{post.Title}</h2>
                    <img src={Logo} alt="" /> 
                  </div>
                  <div className="post-info">
                        <p>Posted by: {post.Username}</p>
                        <p>Posted on: {post.Date}</p>
                    </div>
                  <div className="post-body">
                    <p>{post.Content}</p>
                    <p id="post-tag">Tags: {post.Tags}</p>
                  </div>
                </div>
              </div>
            ))}
            {threads.map((post) => (
              (post.PostID == firstThread[0].PostID) &&
              <div className="thread-post" key={post.PostID}>
                <div className="post-voting">
                  <img src={Logo} alt="" /> <p>0</p>
                  <img src={Logo} alt="" />
                </div>
                <div className="post-container">
                  <div className="post-title-bar">
                    <h2>{post.Title}</h2>
                    <img src={Logo} alt="" /> 
                  </div>
                  <div className="post-info">
                        <p>Posted by: {post.Username}</p>
                        <p>Posted on: {post.Date}</p>
                    </div>
                  <div className="post-body">
                    <p>{post.Content}</p>
                    <p id="post-tag">Tags: {post.Tags}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="forum-recent-post"></div>
        </div>
      </>
    );
  }
}

export default Post;
