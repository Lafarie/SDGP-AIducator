import React, { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import Logo from "./Images/logo.svg";
import "./Forum.css";
import { Link } from "react-router-dom";
import upVote from "./Images/upVote.svg";
import downVote from "./Images/downVote.svg";
import Footer from "./component/Footer";
import PopularPosts from "./component/PopularPosts";
import getCurrentUser from "./currentUser";

function Post() {
  const [posts, setPosts] = useState([]);
  const [forumName, setForumName] = useState("");
  const [threadID, setThreadID] = useState("");
  const [firstThread, setFirstThread] = useState([]);
  const [user, setCurrentuser] = useState(1);

  useEffect(() => {
    getCurrentUser().then((Cuser) => {
      if (Cuser !== null) {
        setCurrentuser(Cuser.uid);
      }
    });
  });

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
        // console.log(data.message);
        setForumName(data.message[0].Name);
        setVote({
          count: data.message[0].UpVotes - data.message[0].DownVotes,
          voted: false,
          type: "",
        });
      });

    fetch(`/api/get/posts?threadId=${threadID}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message.length > 0) {
          // console.log(data.message);
          setPosts(data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // useEffect(()=>{
  //   fetch(`/api//get/forum?forumId=${threadID}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data.message);
  //       setPosts(data.message);
  //       setForumName(data.message[0].Title);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // },[firstThread])

  useEffect(() => {
    setTimeout(() => {
      fetch("/api/update/views", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ threadId: threadID }),
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    }, 20000);
  }, [forumName]);

  //sql query to check if user has voted on thread
  const submitThreadVote = (type) => {
    fetch(
      `/api/check/thread/vote?threadId=${threadID}&userId=${user}&voteType=${type}`
    ).catch((error) => {
      console.error("Error fetching data:", error);
    });
  };
  //sql query to check if user has voted on post
  const submitPostVote = (type, postID) => {
    fetch(
      `/api/check/post/vote?postId=${postID}&userId=${user}&voteType=${type}`
    ).catch((error) => {
      console.error("Error fetching data:", error);
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
      newCount += newType === "UpVotes" ? -1 : 1;
      newType = "Removed";
    }

    setVote({
      count: newCount,
      voted: newType !== "Removed",
      type: newType,
    });

    submitThreadVote(newType);
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
              : voteP.type === "DownVotes"
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
            alt="DownVotes"
            onClick={() => {
              handleVote("DownVotes");
            }}
            className={voteP.type === "DownVotes" ? "voted" : ""}
          />
        </div>
        <div className="post-container">
          <div className="post-body">
            <p>{post.Content}</p>
          </div>
          <div className="post-user-details">
            <div className="post-info">
              <p>Posted by: {post.Username}</p>
              <p>Replyed: {post.TimeAgo}</p>
            </div>
            <img src={Logo} alt="" />
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
                    : vote.type === "DownVotes"
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
                    handleThreadVote("DownVotes");
                  }}
                />
              </div>
              <div className="post-container">
                <div className="thread-title-bar">
                  <h2>{thread.Title}</h2>
                  <img src={Logo} alt="" />
                </div>
                <div className="thread-info">
                  <p>Posted by: {thread.Username}</p>
                  <p>Posted on: {thread.Date}</p>
                </div>
                <div className="post-body">
                  <p>{thread.Content}</p>
                 
                </div>
                <p id="post-tag">Tags: {thread.Tag}</p>
              </div>
            </div>
          ))}
          {Array.isArray(posts) && posts.length > 0
            ? posts.map((post) => (
                <PostComponent post={post} key={`post-${post.PostID}`} />
              ))
            : ""}
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
