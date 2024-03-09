import React, { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import "./Forum.css";
import { useLocation } from "react-router-dom";

function CreatePost() {
  let location = useLocation();
  const [forumID, setForumID] = useState("");
  const [forum, setForum] = useState(null);

  useEffect(() => {
    let url = location.pathname;
    let forumID = url.split("/")[2];
    setForumID(forumID);

    fetch("/api/post/forum", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ forum: "" + forumID }),
    })
      .then((res) => res.json())
      .then((data) => {
        setForum(data.message);
        console.log(data.message);
      })
      .catch((error) => {
        console.error("Error fetching forum data:", error);
      });
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <title>{forumID}</title>
      <div className="forum-page-top-bar">
        <h1 className="forum-title">{forumID}</h1>
      </div>
      <div className="create-post-page">
        <div className="create-post">
          <form id="create-post-form">
            <label id="post-question-label" htmlFor="post-question">Your Question</label>
            <br />
            <input type="text" id="post-question" name="post-question" required/>
            <br />
            <label htmlFor="post-content">Messege:</label>
            <br />
            <textarea id="post-content" name="post-content" required />
            <br />
            <label htmlFor="attach-file"> Attach File:
              <input type="file" id="attach-file" name="attach-file" />
            </label>
            <br />
            <label htmlFor="post-tags">Tags:</label>
            <br />
            <input type="text" id="post-tags" name="post-tags" required />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="forum-recent-post"></div>
      </div>
    </>
  );
}

export default CreatePost;
