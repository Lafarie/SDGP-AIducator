import React, { useEffect, useState } from "react";
import "./App.css";
import "./Forum.css";
import SearchIcon from "./Images/SearchIcon.svg";
import ForumIcon from "./Images/ForumIcon.svg";
import Navbar from "./component/Navbar";
import PopularPosts from "./component/PopularPosts";
import Footer from "./component/Footer";

function Forum() {
  const [forums, setForums] = useState([]);
  const [currentID, setCurrentID] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch(`/api/get/forum?forumId=all`)
      .then((res) => res.json())
      .then((data) => {
        setForums(data.message);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      const filteredForums = forums.filter((forum) =>
        forum.Name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSearchResults(filteredForums);
    } else {
      setSearchResults([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };



  return (
    <>
    <div>
      <Navbar />
      <div className="forum-page-top-bar">
        <h1 className="forum-title">Forum</h1>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onClick={handleKeyPress}
        />
        <button onClick={handleSearch}>
          <img src={SearchIcon} alt="Search" />
        </button>
      </div>
      <div className="forum-container">
        <div className="forums-list">
          {(searchResults.length > 0 ? searchResults : forums).map((forum) => (
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
                      <button
                        id="join-button"
                        onClick={() =>
                          (window.location.href =
                            "/forum-page/" + forum.ForumID + "/" + forum.Name)
                        }
                      >
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
              <PopularPosts />
            </>
          )}
        </div>
      </div>
      <Footer />
      
    </div>
    
    </>
  );
}

export default Forum;
