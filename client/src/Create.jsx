import React, { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import "./Forum.css";
import { useLocation , useNavigate} from "react-router-dom";
import PopularPosts from "./component/PopularPosts";
import Footer from "./component/Footer";
import getCurrentUsers from "./currentUser";
import { ref, onValue, getDatabase, set } from "firebase/database";
import app from "./firebase";

function CreatePost() {
  let location = useLocation();
  const [type, setType] = useState("");
  const [forumID, setForumID] = useState("");
  const [forumName, setForumName] = useState("");
  const [threadID, setThreadID] = useState("");
  const [threadName, setThreadName] = useState("");
  const [forum, setForum] = useState("");
  const [user, setCurrentuser] = useState(1);

  let database = getDatabase(app);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUsers().then((Cuser) => {
      if (Cuser !== null) {
        let userRef = ref(database, "users/" + Cuser.uid);
        // console.log(Cuser.uid);
        setCurrentuser(Cuser.uid);
        // onValue(userRef, (snapshot) => {
        //   setCurrentuser(snapshot.val().fname + " " + snapshot.val().lname);
        //   console.log(snapshot.val().fname + " " + snapshot.val().lname);
        // })
      }
    });
  }, []);

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
      // let file = document.getElementById("forum-attach-file").value;
      fetch(
        "/api/put/create/forum?" +
          "forumName=" +
          forumName +
          "&content=" +
          description
      )
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
      // let file = document.getElementById("thread-attach-file").value;
      let tags = document.getElementById("thread-tags").value;
      console.log(user);
      fetch(
        "/api/put/create/thread?" +
          "userID=" +
          user +
          "&forumID=" +
          forumID +
          "&title=" +
          title +
          "&content=" +
          content +
          "&tags=" +
          tags
      )
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

      fetch(
        "/api/put/create/post?" +
          "userID=" +
          user +
          "&threadID=" +
          threadID +
          "&content=" +
          content +
          "&tags=" +
          tags
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data.message);
        })
        .catch((error) => {
          console.error("Error fetching forum data:", error);
        });
    }


    // To go back
    navigate(-1);
  };

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
              <input
                type="text"
                id="forum-name"
                name="post-question"
                placeholder="Enter Forum Name Here"
                required
              />
              <br />
              <label htmlFor="post-content">Description:</label>
              <br />
              <textarea
                id="forum-description"
                name="post-content"
                placeholder="Enter Small Description Here For Forum"
                required
              />
              {/* <br />
              <label htmlFor="attach-file"> Attach File:
                <input type="file" id="forum-attach-file" name="attach-file" />
              </label> */}
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="side-bar">
            <PopularPosts />
          </div>
        </div>
        <Footer />
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
              <input
                type="text"
                id="thread-question-title"
                name="thread-question"
                placeholder="Enter Post Title Here"
                required
              />
              <br />
              <label htmlFor="thread-content">Messege:</label>
              <br />
              <textarea
                id="thread-content"
                name="thread-content"
                placeholder="Enter Your Post Content Here"
                required
              />
              {/* <br />
              <label htmlFor="thread-attach-file">
                {" "}
                Attach File:
                <input type="file" id="thread-attach-file" name="thread-attach-file" />
              </label> */}
              <br />
              <label htmlFor="thread-tags">Tags:</label>
              <br />
              <input
                type="text"
                id="thread-tags"
                name="thread-tags"
                placeholder="Use , to sperate Tags"
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="side-bar">
            <PopularPosts />
          </div>
        </div>
        <Footer />
      </>
    );
  } else if (type === "post") {
    return (
      <>
        <Navbar />
        <title>{threadName}</title>
        <div className="forum-page-top-bar">
          <h1 className="forum-title">Reply: {threadName}</h1>
        </div>
        <div className="create-post-page">
          <div className="create-post">
            <form id="create-post-form" onSubmit={handleSubmit}>
              <label htmlFor="post-content">Messege:</label>
              <br />
              <textarea
                id="post-content"
                name="post-content"
                placeholder="Enter your Reply Here"
                required
              />
              {/* <br />
              <label htmlFor="attach-file">
                {" "}
                Attach File:
                <input type="file" id="attach-file" name="attach-file" />
              </label> */}
              <br />
              <label htmlFor="post-tags">Tags:</label>
              <br />
              <input
                type="text"
                id="post-tags"
                name="post-tags"
                placeholder="Use , to sperate Tags"
                required
              />
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="side-bar">
            <PopularPosts />
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default CreatePost;
