import React, { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import "./Forum.css";
import { useLocation } from "react-router-dom";
import PopularPosts from "./component/PopularPosts";

function CreatePost() {
  let location = useLocation();
  const [type, setType] = useState("");
  const [forumID, setForumID] = useState("");
  const [forumName, setForumName] = useState("");
  const [threadID, setThreadID] = useState("");
  const [threadName, setThreadName] = useState("");
  const [forum, setForum] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    let url = location.pathname;
    let type = url.split("/")[2];
    let id = url.split("/")[3];

    if (type === "forum") {
      setForum(id);
    } else if (type === "thread") {
      setForumID(id);
    } else if (type === "post") {
      setThreadID(id);
    }

    setType(type);
  }, []);

  useEffect(() => {
    if (type === "thread") {
      fetch("/api/get/forum?forumId=" + forumID)
        .then((res) => res.json())
        .then((data) => {
          setForumName(data.message[0].Name);
        })
        .catch((error) => {
          console.error("Error fetching forum data:", error);
        });
    } else if (type === "post") {
      fetch("/api/get/thread?threadId=" + threadID)
        .then((res) => res.json())
        .then((data) => {
          setThreadName(data.message[0].Title);
        })
        .catch((error) => {
          console.error("Error fetching forum data:", error);
        });
    }
  }, [type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    if (type === "forum") {
      
          let forumName = document.getElementById("forum-name").value;
          let description = document.getElementById("forum-description").value;
          let file = document.getElementById("forum-attach-file").value;
          fetch("/api/put/create/forum?" + "forumName=" + forumName + "&content=" + description + "&file=" + file)
            .then((res) => res.json())
            .then((data) => {
              console.log(data.message);
            })
            .catch((error) => {
              console.error("Error fetching forum data:", error);
            });
    } else if (type === "thread") {
      
          let title = document.getElementById("thread-question-title").value;
          let content = document.getElementById("thread-content").value;
          let file = document.getElementById("thread-attach-file").value;
          let tags = document.getElementById("thread-tags").value;
          console.log(tags)
          
          fetch("/api/put/create/thread?" + "forumID=" + forumID + "&title=" + title + "&content=" +content +"&tags=" +tags)
            .then((res) => res.json())
            .then((data) => {
              console.log(data.message);
            })
            .catch((error) => {
              console.error("Error fetching forum data:", error);
            });
    } else if (type === "post") {

          let content = document.getElementById("post-content").value;
          // let file = document.getElementById("attach-file").value;
          let tags = document.getElementById("post-tags").value;
          // console.log(tags)

          fetch("/api/put/create/post?" + "threadID=" + threadID + "&content=" + content + "&tags=" + tags)
            .then((res) => res.json())
            .then((data) => {
              console.log(data.message);
            })
            .catch((error) => {
              console.error("Error fetching forum data:", error);
            });
    }
  }

  if (type === "forum") {
    return (
      <>
        <Navbar />
        <title>Create Forum</title>
        <div className="forum-page-top-bar">
          <h1 className="forum-title">{"Create Forum"}</h1>
        </div>
        <div className="create-post-page">
          <div className="create-post">
            <form id="create-post-form" onSubmit={handleSubmit}>
              <label id="post-question-label" htmlFor="post-question">
                Forum Name
              </label>
              <br />
              <input type="text" id="forum-name" name="post-question" required/>
              <br />
              <label htmlFor="post-content">Description:</label>
              <br />
              <textarea id="forum-description" name="post-content" required />
              {/* <br />
              <label htmlFor="attach-file"> Attach File:
                <input type="file" id="forum-attach-file" name="attach-file" />
              </label> */}
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="side-bar"><PopularPosts/></div>
        </div>
      </>
    );
  } else if (type === "thread") {
    return (
      <>
        <Navbar />
        <title>{forumName}</title>
        <div className="forum-page-top-bar">
          <h1 className="forum-title">{forumName}</h1>
        </div>
        <div className="create-post-page">
          <div className="create-post">
            <form id="create-post-form" onSubmit={handleSubmit}>
              <label id="post-question-label" htmlFor="post-question">
                Your Question Title
              </label>
              <br />
              <input type="text" id="thread-question-title" name="thread-question" required/>
              <br />
              <label htmlFor="thread-content">Messege:</label>
              <br />
              <textarea id="thread-content" name="thread-content" required />
              {/* <br />
              <label htmlFor="thread-attach-file">
                {" "}
                Attach File:
                <input type="file" id="thread-attach-file" name="thread-attach-file" />
              </label> */}
              <br />
              <label htmlFor="thread-tags">Tags:</label>
              <br />
              <input type="text" id="thread-tags" name="thread-tags" required />
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="side-bar"><PopularPosts/></div>
        </div>
      </>
    );
  } else if (type === "post") {
    return (
      <>
        <Navbar />
        <title>{threadName}</title>
        <div className="forum-page-top-bar">
          <h1 className="forum-title">{threadName}</h1>
        </div>
        <div className="create-post-page">
          <div className="create-post">
            <form id="create-post-form" onSubmit={handleSubmit}>
              <label htmlFor="post-content">Messege:</label>
              <br />
              <textarea id="post-content" name="post-content" required />
              {/* <br />
              <label htmlFor="attach-file">
                {" "}
                Attach File:
                <input type="file" id="attach-file" name="attach-file" />
              </label> */}
              <br />
              <label htmlFor="post-tags">Tags:</label>
              <br />
              <input type="text" id="post-tags" name="post-tags" required />
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="side-bar">
            <PopularPosts/></div>
        </div>
      </>
    );
  }
}

export default CreatePost;
