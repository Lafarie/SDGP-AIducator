import "./App.css";
import "./Forum.css";
import SearchIcon from "./Images/SearchIcon.svg";
import ForumIcon from "./Images/ForumIcon.svg";
import Navbar from "./component/Navbar";
import React, { useState } from "react";

const cardData = [
  {
    id: 1,
    image:
      "https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg",
    title: "Card 1",
    description: "Description for card 1",
  },
  {
    id: 2,
    image:
      "https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg",
    title: "Card 2",
    description: "Description for card 2",
  },
  {
    id: 3,
    image:
      "https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg",
    title: "Card 1",
    description: "Description for card 1",
  },
  {
    id: 4,
    image:
      "https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg",
    title: "Card 2",
    description: "Description for card 2",
  },
  {
    id: 5,
    image:
      "https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg",
    title: "Card 1",
    description: "Description for card 1",
  },
  {
    id: 6,
    image:
      "https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg",
    title: "Card 2",
    description: "Description for card 2",
  },
  {
    id: 7,
    image:
      "https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg",
    title: "Card 1",
    description: "Description for card 1",
  },
  {
    id: 8,
    image:
      "https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg",
    title: "Card 2",
    description: "Description for card 2",
  },
  {
    id: 9,
    image:
      "https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg",
    title: "Card 1",
    description: "Description for card 1",
  },
  {
    id: 10,
    image:
      "https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg",
    title: "Card 2",
    description: "Description for card 2",
  },
  {
    id: 11,
    image:
      "https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg",
    title: "Card 1",
    description: "Description for card 1",
  },
  {
    id: 12,
    image:
      "https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg",
    title: "Card 2",
    description: "Description for card 2",
  },
];

function Forum() {
  // const [selectedForum, setSelectedForum] = useState(null);

  // const handleForumClick = (forum) => {
  //   setSelectedForum(forum);
  // };

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
          <div className={"forum"}>
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
          </div>
          {/* <Forums/> */}
        </div>
        <div className={"side-bar"}>
          {/* <PopularForums /> */}
          <div className="img"> <img src="" alt="" /></div>
          <div className="forum-long-details">
            <h2>{'Forum Name'}</h2>
            <p>{'Description for forum'}</p>
            <button id={'forum-id'} name={'ForumName'}>Join</button>
          </div>
          </div>
      </div>
    </div>
  );
}

const Forums = () => {
  return (
    <div>
      {cardData.map((forum) => (
        <div className={"forum"} key={forum.id}>
          <div className="img">
            <img src={forum.image} alt="" />
          </div>
          <div className="forum-short-details">
            <h2>{forum.title}</h2>
            <p>{forum.description}</p>
          </div>
          <div className="forum-status">
            <div><p>{'Questions'}</p><p>{'Answers'}</p></div>
            <div><p>{count(forum.questions)}</p><p>{count(forum.answers)}</p></div>
          </div>
        </div>
      ))}
    </div>
  );
}

const count = (data) => {
  return data.length;
}

//if forum clicked

const ForumSideCard = () => {
  return (
    <div className={"side-bar"}>
      <div className="img"> <img src="" alt="" /></div>
      <div className="forum-long-details">
        <h2>{forum.title}</h2>
        <p>{forum.description}</p>
        <button id={'forum-id'} name={'ForumName'}>Join</button>
      </div>
    </div>
  );

}

const PopularForums = () => {

}
export default Forum;
