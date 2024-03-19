import logo from '../Images/logoAI.svg';
import defaultProfile from "../Images/defaultProfile.svg"
import '../App.css';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import getCurrentUsers from '../currentUser';
import { useEffect, useState } from 'react';
import getCurrentUser from '../currentUser';
import app from '../firebase';
import { getDatabase, ref, onValue} from "firebase/database";
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
// import PropTypes from 'prop-types';

function showActivePage(linkpath, url){
  if(url === linkpath){
    return "underline";
  } else {
    return "none";
  }
}

function Navbar() {
   let url = useLocation();
  let back = useNavigate();

  const [showprofile, setshowprofile] = useState(true);

  useEffect(() => {
    getCurrentUsers().then((user) => {
      if(user === null){
        back("/")
      } else {
        console.log(user.uid)
      }
    })
  }, []);

  return (
    <div id={"navBar"}>
      <div id={"left"}>
        <div id={"imageContainer"}>
          <img src={logo} alt="AIducator logo" id={"logo"}/>
        </div>
        <Link className='NavLinks' to={"/home"}><h1>AIducator</h1></Link>
      </div>
      <div id={"right"}>
        <ul id={"navList"}>
          <li><Link className='NavLinks' to={"/home"} style={{textDecoration:showActivePage("/home", url.pathname)}}>HOME</Link></li>
          <li><Link className='NavLinks' to={"/video"} style={{textDecoration:showActivePage("/video", url.pathname)}}>VIDEOS</Link></li>
          <li><Link className='NavLinks' to={"/quiz"} style={{textDecoration:showActivePage("/quiz", url.pathname)}}>QUIZ</Link></li>
          <li><Link className='NavLinks' to={"/forum"} style={{textDecoration:showActivePage("/forum", url.pathname)}}>FORUM</Link></li>
          <li><Link className='NavLinks' to={"/todo"} style={{textDecoration:showActivePage("/todo", url.pathname)}}>TO-DO</Link></li>
        </ul>
      </div>
      <div id={"rightCorner"} className='NavLinks' onClick={() => {
        if(showprofile){
          document.getElementById("profileSec").style.display = "block";
        } else {
          document.getElementById("profileSec").style.display = "none";
        }
        setshowprofile(!showprofile);
      }}>
        <img src={defaultProfile} alt="profile" id={"profile"}/>
      </div>
      <ProfileSection id="profileSec"/>
    </div>
  )
}

function ProfileSection({id}){

  const [Currentuser, setCurrentuser] = useState(null);
  const [BaseDetails, setBaseDetails] = useState(null)

  let goBack = useNavigate()

  let db = getDatabase(app);

  useEffect(() => {
      getCurrentUser().then((user) => {
          if(user){
            setBaseDetails(user)
            let dbRef = ref(db, "users/" + user.uid)
            onValue(dbRef, (user) => {
              console.log("Hello")
              setCurrentuser(user.val())
            })
          }
        }).catch(error => {
          console.error(error)
        })
  }, [])



  useEffect(() => {
    let navbar = document.getElementById("navBar")
    if(navbar !== null){
      document.getElementById(id).style.top = navbar.clientHeight  + "px";
      console.log(navbar.clientHeight)
    }

  }, []);

  function UserSignOut(){
    let auth = getAuth();

    signOut(auth).then(() => {
      setCurrentuser(null)
      goBack("/")
    }).catch(error => {
      console.error(error);
    });
  }

  return(
    <div id={id}>
      <div id='userDeatils'>
        <h1>{Currentuser !== null?Currentuser.fname + " " + Currentuser.lname:"User"}</h1>
        <h1>{BaseDetails !== null?BaseDetails.email:"Email"}</h1>
      </div>
      <hr id='profileHr'></hr>
      <h2 onClick={() => {
        if(confirm("Do you want to sign out")){
          UserSignOut();
        }
      }}>Sign Out</h2>
    </div>
  )

}

export default Navbar;