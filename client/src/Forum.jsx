// Import necessary libraries and components
import React, { useEffect, useState } from "react";
import "./App.css";
import "./Forum.css";
import SearchIcon from "./Images/SearchIcon.svg";
import ForumIcon from "./Images/ForumIcon.svg";
import Navbar from "./component/Navbar";
import { Link } from "react-router-dom";

// Define Forum component
function Forum() {
  // Define state for forum data
  const [forums, setForums] = useState([]);
  const [currentID, setCurrentID] = useState("");

  // // Fetch forum data from server
  useEffect(() => {
    fetch("/api/post/forum", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Pass JSON data directly in the body
      body: JSON.stringify({ forum: "all" }),
    })
      .then((res) => res.json())
      .then((data) => {
        setForums(data.message);
        console.log(data.message);
      });
  }, []);

  // Render Forum component JSX
  return (
    <div>
      <Navbar />
      {/* <h1 className="title">Forum</h1> */}
      <div className="forum-page-top-bar">
        <h1 className="forum-title">Forum</h1>
      </div>
      <div className={"search-bar"}>
        <input type="text" placeholder="Search" />
        <button>
          <img src={SearchIcon} alt="Search" />
        </button>
      </div>
      <div className={"forum-container"}>
        <div className={"forums-list"}>
          {forums.map((forum) => (
            <div
              className={"forum"}
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
                  <p>{forum.questions}1</p>
                  <p>{forum.answers}2</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={"side-bar"}>
          {forums.map(
            (forum) =>
              forum.ForumID === currentID && (
                <div key={forum.ForumID}>
                  <div className="img">
                    <img src="" alt="" />
                  </div>
                  <div className="forum-long-details">
                    <h2>{forum.name}</h2>
                    <p>{forum.Description}</p>
                    <Link to={"/forum-page/" + forum.ForumID}>
                      <button id="join-button"> Join </button>
                    </Link> 
                  </div>
                </div>
              )
          )}
          {/* Render PopularForums component here */}
        </div>
      </div>
    </div>
  );
}

// Export Forum component
export default Forum;
