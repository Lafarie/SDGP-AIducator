import React from 'react';
import './QuizResults.css'; 
import Navbar from './component/Navbar';
import defaultProfile from "./Images/defaultProfile.svg";
import Arrow from "./Images/ArrowIcon.png";
import { useLocation } from 'react-router-dom';


const QuizResults = () => {
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const totalScore = urlParams.get('score');
    const correctAnswers = urlParams.get('correct');

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
                        <label className='Name'>Name:</label>
                        <input type="text" className="NameInput" />
                    </div>
                    <div className='Email-box'>
                        <label className='Email'>Email:</label>
                        <input type="text" className="EmailInput" />
                    </div>
                    <div className='Grade-box'>
                        <label className='Grade'>Grade:</label>
                        <input type="text" className="GradeInput" />
                    </div>
                </div>
                <div className="QandA">
                    <label className='QandA-label'>Questions and answers</label>
                    <img src={Arrow} alt='arrow' id={"Arrow"}/>
                </div>
            </div>
            <div className="column">
                <div className="Remarks-box">
                    <label className='Remarks'>Remarks</label>
                    <input type='text' className='RemarksInput'/>
                </div>
            </div>
        </div>
    </div>
  );
};

export default QuizResults;
