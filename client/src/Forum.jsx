// Import necessary libraries and components
import React, { useEffect, useState } from "react";
import "./App.css";
import "./Forum.css";
import SearchIcon from "./Images/SearchIcon.svg";
import ForumIcon from "./Images/ForumIcon.svg";
import Navbar from "./component/Navbar";

// Define Forum component
function Forum() {
  // Define state for forum data
  const [forums, setForums] = useState([]);


//   useEffect(() => {
//     fetch("/api/data")  // Relative path to your server's endpoint
//         .then(res => res.json())
//         .then(data => {
//             console.log(data);
//         })
// }, []);


  // // Fetch forum data from server
  useEffect(() => {
    fetch("api/forum")
      .then(res => res.json())
      .then(data => {
        // Check if the response data contains an array directly or is wrapped in an object
        // const forumData = Array.isArray(data) ? data : data.message;
        setForums(data.message);
        console.log(data.message);
      })
  }, []);

  // Render Forum component JSX
  return (
    <div>
      <Navbar />
      <div className={"title"}>
        <h1>Forum</h1>
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
            <div className={"forum"} key={forum.ForumID} onClick={ () =>console.log(forum.ForumID)}>
              <div className="img">
                <img src={ForumIcon} alt="" />
              </div>
              <div className="forum-short-details">
                <h2>{forum.Name}</h2>
                <p>{forum.Description}</p>
              </div>
              <div className="forum-status">
                <div>
                  <p>{'Questions'}</p>
                  <p>{'Answers'}</p>
                </div>
                <div>
                  <p>{forum.questions}</p>
                  <p>{forum.answers}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={"side-bar"}>
          {/* Render PopularForums component here */}
        </div>
      </div>
    </div>
  );
}

// Export Forum component
export default Forum;
