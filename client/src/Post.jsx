import React, { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import Logo from "./Images/logo.svg";
import "./Forum.css";
import { Link } from "react-router-dom";
import upVote from "./Images/upVote.svg";
import downVote from "./Images/downVote.svg";
import Footer from "./component/Footer";
import PopularPosts from "./component/PopularPosts";

function Post() {
  const [posts, setPosts] = useState([]);
  const [forumName, setForumName] = useState("");
  const [threadID, setThreadID] = useState("");
  const [firstThread, setFirstThread] = useState([]);
  const [user, setUser] = useState(1);
  const [vote, setVote] = useState({
    count: 0,
    voted: false,
    type: "",
  });

  useEffect(() => {
    let url = location.pathname;
    let threadID = url.split("/")[2];

    setThreadID(threadID);

    fetch(`/api/get/thread?threadId=${threadID}`)
      .then((res) => res.json())
      .then((data) => {
        setFirstThread(data.message);
        console.log(data.message);
        setVote({
          count: data.message[0].UpVotes - data.message[0].DownVotes,
          voted: false,
          type: "",
        });
        console.log(data.message);
      });

    fetch(`/api/get/posts?threadId=${threadID}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setPosts(data.message);
        setForumName(data.message[0].Title);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch("/api/update/views", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ threadId: threadID }),
      });
    }, 20000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [forumName]);

  //sql query to check if user has voted on thread
  const submitThreadVote = (type) => {
    fetch(
      `/api/check/thread/vote?threadId=${threadID}&userId=${user}&voteType=${type}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "successful") {
          fetch(`/api/update/thread/vote?threadId=${threadID}&vote=${type}`);
          console.log("Thread-Voted");
        }
      });
  };
  //sql query to check if user has voted on post
  const submitPostVote = (type, postID) => {
    fetch(
      `/api/check/post/vote?postId=${postID}&userId=${user}&voteType=${type}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "successful") {
          console.log("Post-Voted");
          fetch(`/api/update/post/vote?postId=${postID}&vote=${type}`);
        }
      });
  };

  // Define a new component for the post
  const handleThreadVote = (newType) => {
    let newCount = vote.count;
    if (!vote.voted) {
      newCount += newType === "UpVotes" ? 1 : -1;
    } else if (vote.type !== newType) {
      newCount += newType === "UpVotes" ? 2 : -2;
    } else {
      newCount += newType === "¸" ? -1 : 1;
      newType = "Removed";
    }

    setVote({
      count: newCount,
      voted: newType !== "Removed",
      type: newType,
    });

    submitThreadVote(newType, threadID.threadID);
  };

  // Define a new component for the post
  const PostComponent = ({ post }) => {
    const [voteP, setVoteP] = useState({
      count: post.UpVotes - post.DownVotes,
      voted: false,
      type: "",
    });

    const handleVote = (newType) => {
      let newCount = voteP.count;
      if (!voteP.voted) {
        newCount += newType === "UpVotes" ? 1 : -1;
      } else if (voteP.type !== newType) {
        newCount += newType === "UpVotes" ? 2 : -2;
      } else {
        newCount += newType === "UpVotes" ? -1 : 1;
        newType = "Removed";
      }

      setVoteP({
        count: newCount,
        voted: newType !== "Removed",
        type: newType,
      });

      submitPostVote(newType, post.PostID);
    };

    return (
      <div className="thread-post" key={`post-${post.PostID}`}>
        <div
          className={`post-voting ${
            voteP.type === "UpVotes"
              ? "voted-green"
              : voteP.type === "DownVotesss"
              ? "voted-red"
              : ""
          }`}
        >
          <img
            src={upVote}
            alt="UpVotes"
            onClick={() => {
              handleVote("UpVotes");
            }}
            className={voteP.type === "UpVotes" ? "voted" : ""}
          />
          <p>{voteP.count}</p>
          <img
            src={downVote}
            alt="DownVotesss"
            onClick={() => {
              handleVote("DownVotesss");
            }}
            className={voteP.type === "DownVotesss" ? "voted" : ""}
          />
        </div>
        <div className="post-container">
          <div className="post-title-bar">
            <img src={Logo} alt="" />
          </div>
          <div className="post-info">
            <p>Posted by: {post.Username}</p>
            <p>Replyed: {post.TimeAgo}</p>
          </div>
          <div className="post-body">
            <p>{post.Content}</p>
          </div>
        </div>
      </div>
    );
  };

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
          {firstThread.map((thread) => (
            <div className="thread-post" key={`thread-${thread.threadId}`}>
              <div
                className={`post-voting ${
                  vote.type === "UpVotes"
                    ? "voted-green"
                    : vote.type === "DownVotesss"
                    ? "voted-red"
                    : ""
                }`}
              >
                <img
                  src={upVote}
                  alt="upvote"
                  onClick={() => {
                    handleThreadVote("UpVotes");
                  }}
                />
                <p>{vote.count}</p>
                <img
                  src={downVote}
                  alt="downvote"
                  onClick={() => {
                    handleThreadVote("DownVotesss");
                  }}
                />
              </div>
              <div className="post-container">
                <div className="post-title-bar">
                  <h2>{thread.Title}</h2>
                  <img src={Logo} alt="" />
                </div>
                <div className="post-info">
                  <p>Posted by: {thread.Username}</p>
                  <p>Posted on: {thread.Date}</p>
                </div>
                <div className="post-body">
                  <p>{thread.Content}</p>
                  <p id="post-tag">Tags: {thread.Tag}</p>
                </div>
              </div>
            </div>
          ))}
          {posts.map((post) => (
            <PostComponent post={post} key={`post-${post.PostID}`} />
          ))}
        </div>
        <div className="forum-recent-post">
          <PopularPosts />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Post;
