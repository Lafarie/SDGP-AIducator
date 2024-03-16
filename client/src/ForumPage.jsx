import React, { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import "./Forum.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function ForumPage() {
  let location = useLocation();

  const [forumID, setforumID] = useState("");
  const [forumName, setforumName] = useState("Hello");
  const [threads, setThreads] = useState(null); // Initialize forum state as null;

  useEffect(() => {
    let url = location.pathname;
    let forumID = url.split("/")[2];
    let forumName = url.split("/")[3];
    // console.log(forumName)
    setforumID(forumID);
    setforumName(forumName.replace(/%20/g, ` `));

    fetch(`/api/get/threads?forumId=${forumID}`)
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
  if (!threads) {
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
      <title>{forumName}</title>

      <div className="forum-page-top-bar">
        <h1 className="forum-title">{forumName}</h1>
        <Link to={"/create/thread/" + forumID} id="create-post-button">
          Create Post
        </Link>
      </div>

      <div className="forum-page">
        <div className="forum-page-posts">
          <div className="forum-page-bar">
            <h2>Votes & Reply</h2>
            <h3>Questions</h3>
          </div>
          {threads.map((thread) => {
            return (
              <div className="post"
                key={thread.ThreadID}
                onClick={() => {
                  window.location.href = "/post/" + forumID + "/" + forumName + "/" + thread.ThreadID;
                }}>
                <div className="post-status">
                  <div className="post-vote"></div>
                  <div className="post-reply"></div>
                  <div className="post-views"></div>
                </div>
                <div className="post-details">
                  <h2>{thread.Title}</h2>
                  <p>{thread.Content}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="forum-recent-post"></div>
      </div>
      {/* <h3>{forum[0].Name}</h3>
      <p>{forum[0].Description}</p> */}
    </>
  );
}

export default ForumPage;
