
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './App';
import Forum from './Pages/Forum';
import Video from './Pages/Video';
import Quiz from './Pages/Quiz';
import Todo from './Pages/List';

import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/video" element={<Video/>}/> {/*Add the required element to be rendered in the element attribute (according to the path specified)*/}
      <Route path="/quiz" element={<Quiz/>}/>
      <Route path="/forum" element={<Forum/>}/>
      <Route path="/todo" element={<Todo/>}/>
      <Route path="/profile" element={<Home/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
