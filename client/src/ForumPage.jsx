import React, { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import "./Forum.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function ForumPage() {
  let location = useLocation();

  const [forumID, setforumID] = useState("");
  const [forum, setForums] = useState(null); // Initialize forum state as null;

  useEffect(() => {}, []);

  useEffect(() => {
    let url = location.pathname;
    let forumID = url.split("/")[2];
    setforumID(forumID);

    fetch("/api/post/forum", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Pass JSON data directly in the body
      body: JSON.stringify({ forum: "" + forumID }),
    })
      .then((res) => res.json())
      .then((data) => {
        setForums(data.message); // Update forum state with the data
        console.log(data.message);
      })
      .catch((error) => {
        console.error("Error fetching forum data:", error);
      });
  }, []);

  // Render loading state while fetching data
  if (!forum) {
    return (
      <>
        <Navbar />
        <p>Loading...</p>
      </>
    );
  }

  // Render ForumPage component once data is fetched
  return (
    <>
      <Navbar />
      <title>{forum[0].Name}</title>

      <div className="forum-page-top-bar">
        <h1 className="forum-title">{forum[0].Name}</h1>
        <Link to={"/create-post/" + forumID} id="create-post-button">
            Create Post
        </Link>
      </div>

      <div className="forum-page">
        <div className="forum-page-posts">
          <div className="forum-page-bar">
            <h2>Votes & Reply</h2>
            <h3>Questions</h3>
          </div>
          <div className="post">
            <div className="post-status">
              <div className="post-vote"></div>
              <div className="post-reply"></div>
              <div className="post-views"></div>
            </div>
            <div className="post-details">
              <h2>Post Title</h2>
              <p>Post Content</p>
            </div>
          </div>
        </div>
        <div className="forum-recent-post"></div>
      </div>
      {/* <h3>{forum[0].Name}</h3>
      <p>{forum[0].Description}</p> */}
    </>
  );
}

export default ForumPage;
