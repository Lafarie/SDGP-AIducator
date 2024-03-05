import "./App.css";
import "./Forum.css";
import SearchIcon from "./Images/SearchIcon.svg";
import ForumIcon from "./Images/ForumIcon.svg";
import Navbar from "./component/Navbar";
import React, { useEffect, useState } from "react";

let [forums, setForums] = useState([]);

function Forum() {
  // const [selectedForum, setSelectedForum] = useState(null);

  // const handleForumClick = (forum) => {
  //   setSelectedForum(forum);
  // };

  // Fetch forum data from server
  useEffect(() => {
    fetch("/post/get/forums", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ forum: "all" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setForums(data);
      });
  }, []);

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
          {/* <div className={"forum"}>
            <div className="img">
              <img src={ForumIcon} alt="" />
            </div>
            <div className="forum-short-details">
              <h2>{'Forum Name'}</h2>
              <p>{'Description for forum'}</p>
            </div>
            <div className="forum-status">
              <div><p>{'Questions'}</p><p>{'Answers'}</p></div>
              <div><p>{'5'}</p><p>{'3'}</p></div>
            </div>
          </div> */}
          <Forums />
        </div>
        <div className={"side-bar"}>
          {/* <PopularForums /> */}
          <div className="img">
            {" "}
            <img src="" alt="" />
          </div>
          <div className="forum-long-details">
            <h2>{"Forum Name"}</h2>
            <p>{"Description for forum"}</p>
            <button id={"forum-id"} name={"ForumName"}>
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const Forums = () => {
  console.log("Forums");

  return (
    <div>
      {data.map((forum) => (
        <div className={"forum"} key={forum.ForumID}>
          <div className="img">
            <img src="" alt="" />
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
              <p>{"forum.questions"}</p>
              <p>{"forum.answers"}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const count = (data) => {
  return data.length;
};

//if forum clicked

// const ForumSideCard = () => {
//   return (
//     <div className={"side-bar"}>
//       <div className="img"> <img src="" alt="" /></div>
//       <div className="forum-long-details">
//         <h2>{forum.title}</h2>
//         <p>{forum.description}</p>
//         <button id={'forum-id'} name={'ForumName'}>Join</button>
//       </div>
//     </div>
//   );

// }

const PopularForums = () => {};
export default Forum;
