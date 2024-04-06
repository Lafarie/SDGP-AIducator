import React, { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import "./Forum.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SearchIcon from "./Images/SearchIcon.svg";
import PopularPosts from "./component/PopularPosts";
import upvote from "./Images/upVote.svg";
import downvote from "./Images/downVote.svg";
import post from "./Images/post.svg";
import eye from "./Images/eye.svg";
import Footer from "./component/Footer";

function ForumPage() {
  let location = useLocation();

  const [forumID, setForumID] = useState("");
  const [forumName, setForumName] = useState("Hello");
  const [threads, setThreads] = useState(null); // Initialize forum state as null;
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    let url = location.pathname;
    let forumID = url.split("/")[2];
    let forumName = url.split("/")[3];
    setForumID(forumID);
    setForumName(forumName.replace(/%20/g, " "));

    fetch(`/api/get/threads?forumId=${forumID}`)
      .then((res) => res.json())
      .then((data) => {
        setThreads(data.message);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      const filteredThreads = threads.filter((thread) =>
        thread.Title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSearchResults(filteredThreads);
    } else {
      setSearchResults([]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

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
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>
          <img src={SearchIcon} alt="Search" />
        </button>
      </div>

      <div className="forum-page">
        <div className="forum-page-posts">
          <div className="forum-page-bar">
            <h2>Votes & Reply</h2>
            <h3>Questions</h3>
          </div>
          {(searchResults.length > 0 ? searchResults : threads).map((thread) => {
            return (
              <Link
                to={"/post/" + thread.ThreadID}
                className="post"
                key={thread.ThreadID}
              >
                <div className="post-status">
                  <div className="post-vote">
                    <div className="post-vote-row">
                      <img src={upvote} alt="upvote" />
                      <img src={downvote} alt="downvote" />
                    </div>
                    <p>{thread.UpVotes - thread.DownVotes}</p>
                  </div>
                  <div className="post-reply">
                    <img src={post} alt="post" />
                    <p>{thread.PostCount}</p>
                  </div>
                  <div className="post-views">
                    <img src={eye} alt="eye" />
                    <p>{thread.Views}</p>
                  </div>
                </div>
                <div className="post-details">
                  <h2>{thread.Title}</h2>
                  <p>
                    {thread.Content.length > 85
                      ? thread.Content.slice(0, 85) + "..."
                      : thread.Content}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="side-bar">
          <PopularPosts />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ForumPage;
