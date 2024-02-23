import "./App.css";
import "./Forum.css";
import Navbar from "./component/Navbar";
import React, { useState } from "react";

const cardData = [
  {id: 1,image:"https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg",title: "Card 1",description: "Description for card 1",},
  {id: 2,image:"https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg",title: "Card 2",description: "Description for card 2",},
  {id: 3,image:"https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg",title: "Card 1",description: "Description for card 1",},
  {id: 4,image:"https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg",title: "Card 2",description: "Description for card 2",},
  {id: 5,image:"https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg",title: "Card 1",description: "Description for card 1",},
  {id: 6,image:"https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg",title: "Card 2",description: "Description for card 2",},
  {id: 7,image:"https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg",title: "Card 1",description: "Description for card 1",},
  {id: 8,image:"https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg",title: "Card 2",description: "Description for card 2",},
  {id: 9,image:"https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg",title: "Card 1",description: "Description for card 1",},
  {id: 10,image:"https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg",title: "Card 2",description: "Description for card 2",  },
  {id: 11,image:"https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg",title: "Card 1",description: "Description for card 1",},
  {id: 12,image:"https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg",title: "Card 2",description: "Description for card 2",},
];

function Forum() {
  // const [selectedForum, setSelectedForum] = useState(null);

  // const handleForumClick = (forum) => {
  //   setSelectedForum(forum);
  // };

  return (
    <div>
      <Navbar />
      <div className={'title'}><h1>Forum</h1></div>
        <div className={'forum-bar'}></div>
        <div className={'forum-container'}>
        <div className={'forums'}>
          <div className={'test'}></div>
          <div className={'test'}></div>
          <div className={'test'}></div>
           {/* <Forums/> */}
        </div>
        <div className={'side-bar'}>
        {/* <PopularForums /> */}
        </div>
      </div>
    </div>
  );
}

const Forums = () => {
  return (
    <div>
      {cardData.map((forum) => (
        <ForumCard key={forum.id} forum={forum} />
      ))}
    </div>
  );

};


const ForumDetails = ({ forum }) => {
  return (
    <div>
      <img src={forum.image} alt={forum.title} />
      <h2>{forum.title}</h2>
      <p>{forum.description}</p>
      <button>Join</button>
    </div>
  );
};

const PopularForums = () => {
  return (
    <div>
      
      {/* Render your popular forums list here */}
    </div>
  );
};

export default Forum;
