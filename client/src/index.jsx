import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './App';
import Forum from './Forum';
import Video from './video';
import QuizHome from './QuizHome';
import Library from './3DLibrary';
import ForumPage from './ForumPage';
import CreatePost from './Create';
import Post from './Post';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LessonList from './LessonList';

//react-scripts
  // "scripts": {
  //   "start": "react-scripts start",
  //   "build": "react-scripts build",
  //   "test": "react-scripts test",
  //   "eject": "react-scripts eject"
  // }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/video" element={<Video/>}/> {/*Add the required element to be rendered in the element attribute (according to the path specified)*/}
      <Route path="/quiz" element={<QuizHome/>}/>
      <Route path="/forum" element={<Forum/>}/>
      <Route path="/todo" element={<Home/>}/>
      <Route path="/profile" element={<Home/>}/>
      <Route path="/library" element={<Library/>}/>
      <Route path="LessonList" element={<LessonList subject={'Mathematics'}/>}/>
      <Route path="/forum-page/:index/:forumName" element={<ForumPage/>}/>
      <Route path="/create/:type/:index" element={<CreatePost/>}/>
      <Route path="/post/:threadID" element={<Post/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
