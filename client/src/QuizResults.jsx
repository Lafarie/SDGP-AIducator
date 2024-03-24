import React, { useEffect,useState } from 'react';
import './QuizResults.css'; 
import Navbar from './component/Navbar';
import defaultProfile from "./Images/defaultProfile.svg";
import { useLocation } from 'react-router-dom';
import getCurrentUser from './currentUser';
import { getDatabase, ref, onValue} from "firebase/database";
import { getAuth } from "firebase/auth";
import app from './firebase';



const QuizResults = () => {
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const totalScore = urlParams.get('score');
    const correctAnswers = Math.floor(totalScore / 10);

    const [username, setUsername] = useState("");
    const [usermail, setUsermail] = useState("");
    const [userGrade, setUserGrade] = useState("");
    const [Currentuser, setCurrentuser] = useState(null);
    const [BaseDetails, setBaseDetails] = useState(null);
    const [remarks,setRemarks]= useState("");

    let db = getDatabase(app)

    useEffect(() => {
        const start = performance.now();
        getCurrentUser()
          .then((user) => {
            if (user) {
              setBaseDetails(user);
              let userId = user.uid;
              let dbRef = ref(db, "users/" + user.uid);
              onValue(dbRef, (user) => {
                setCurrentuser(user.val());
              });
              const end = performance.now() - start;
              console.log(end);
            }
          })
          .catch((error) => {
            console.error(error);
          });

          // Set remarks based on total score
        if (totalScore >= 50) {
            setRemarks("Keep up the good work!");
        } else {
            setRemarks("Needs improvement!");
        }


      }, [totalScore]);

    

  return (
    <div>
        <Navbar></Navbar>
        <div className="quiz-results-container">
            <div className="column">
                <div className="N-Questions">
                    <label className='NQ-digit'> 10 </label>
                    <label className='NQs'>Number of questions</label>
                </div>
                <div className="Correct-box">
                    <label className='Correct'>{correctAnswers}</label>
                    <label className='CorrectLabel'>Correct answers</label>
                </div>
                <div className="Score-box">
                    <label className='Score'>{totalScore}</label>
                    <label className='ScoreLabel'>Score</label>
                </div>
            </div>
            <div className="column">
                <div className="profile-picture">
                    <img src={defaultProfile} alt="profile" id={"profile"}/>
                </div>
                <div className="details-box">
                    <div className='Name-box'>
                        <label className='Name'>Name: {Currentuser === null? "User Name" : Currentuser.fname + " " + Currentuser.lname}</label>
                    </div>
                    <div className='Email-box'>
                        <label className='Name'>Email: {BaseDetails === null? "User Email" : BaseDetails.email}</label>
                    </div>
                    <div className='Grade-box'>
                        <label className='Name'>Grade: {Currentuser === null? "User Grade" : Currentuser.grade.split("e")[1]}</label>
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="Remarks-box">
                    <label className='Remarks'>Remarks</label>
                    <label className='feedback'>{remarks}</label>
                </div>
            </div>
        </div>
    </div>
  );
};

export default QuizResults;
