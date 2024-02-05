
import './App.css';
import Navbar from './components/Navbar';
import Assistant from './Pages/AIAssistant';


import Assistant from './AIAssistant';
import {Link, useLocation} from 'react-router-dom';

function showActivePage(linkpath, url){
  if(url === linkpath){
    return "underline";
  } else {
    return "none";
  }
}



function Home() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Assistant></Assistant>
    </div>
  );
}

export default Home;
