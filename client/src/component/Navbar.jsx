import logo from '../Images/logoAI.svg';
import defaultProfile from "../Images/defaultProfile.svg"
import '../App.css';
import { Link, useLocation } from 'react-router-dom';

function showActivePage(linkpath, url) {
  if (url === linkpath) {
    return "underline";
  } else {
    return "none";
  }
}

function Navbar() {
  let url = useLocation();
  return (
    <div id={"navBar"}>
      <div id={"left"}>
        <div id={"imageContainer"}>
          <img src={logo} alt="AIducator logo" id={"logo"} />
        </div>
        <Link className='NavLinks' to={"/"}><h1>AIducator</h1></Link>
      </div>
      <div id={"right"}>
        <ul id={"navList"}>
          <li><Link className='NavLinks' to={"/"} style={{ textDecoration: showActivePage("/", url.pathname) }}>HOME</Link></li>
          <li><Link className='NavLinks' to={"/videoPage"} style={{ textDecoration: showActivePage("/video", url.pathname) }}>VIDEOS</Link></li>
          <li><Link className='NavLinks' to={"/quiz"} style={{ textDecoration: showActivePage("/quiz", url.pathname) }}>QUIZ</Link></li>
          <li><Link className='NavLinks' to={"/forum"} style={{ textDecoration: showActivePage("/forum", url.pathname) }}>FORUM</Link></li>
          <li><Link className='NavLinks' to={"/todo"} style={{ textDecoration: showActivePage("/todo", url.pathname) }}>TO-DO</Link></li>
        </ul>
      </div>
      <Link id={"rightCorner"} className='NavLinks' to={"/profile"}>
        <div>
          <img src={defaultProfile} alt="profile" id={"profile"} />
        </div>
      </Link>
    </div>
  )
}

export default Navbar;