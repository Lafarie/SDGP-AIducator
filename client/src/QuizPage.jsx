import React, { useState, useEffect } from 'react';
import './QuizPage.css'; 
import { useLocation,Link,useParams } from 'react-router-dom';
import Navbar from './component/Navbar';

const QuizPage = () => {
  const { grade, subject, lesson } = useParams();
  const location = useLocation();
  const apiUrl = `/quiz/questions?grade=${grade}&lessonName=${encodeURIComponent(lesson)}`;


const [quizQuestions, setQuizQuestions] = useState([]);
const [selectedOptions, setSelectedOptions] = useState([]);


  // Function to calculate the number of remaining questions
  const remainingQuestions = quizQuestions.length - selectedOptions.filter(option => option !== null).length;

  // Function to handle radio button selection
  const handleOptionSelect = (questionIndex, optionIndex) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[questionIndex] = optionIndex;
    setSelectedOptions(updatedOptions);
  };

   // Remaining time state
   const [remainingTime, setRemainingTime] = useState(300); // 5 minutes in seconds

   // Function to format time to display as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Effect to update remaining time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(timer);
  }, []);

  // Calculate total score
  const totalScore = selectedOptions.reduce((total, optionIndex, index) => {
    if (optionIndex !== null && quizQuestions[index].options[optionIndex] === quizQuestions[index].correctAnswer) {
      return total + 10;
    }
    return total;
  }, 0);

  //Calculate number of correct answerss
  const correctAnswers = selectedOptions.reduce((count, optionIndex, index) => {
    if (optionIndex !== null && quizQuestions[index].options[optionIndex] === quizQuestions[index].correctAnswer) {
      return count + 1;
    }
    return count;
  }, 0);



  // Function to handle form submission
  const handleSubmit = async() => {
    try {
      const response = await fetch('/api/quiz/questions', {
        questionObj: QuestionObj,
        selectedOptions: selectedOptions
      });

      // Handle the response if needed
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  };

  const [questions, setQuestions]= useState(null)
  const [ options, setOptions]= useState(null)

  useEffect(()=>{
    const QuestionObj = {
      gradeid: location.pathname.split("/")[3].replaceAll("%20", " "),
      subjectid: location.pathname.split("/")[2].replaceAll("%20", " "),
      lessonName: location.pathname.split("/")[4].replaceAll("%20", " ")
    };
    fetch("/api/get/test", {
      method: "post", 
      headers: {"Content-Type" : "application/json"}, 
      body: JSON.stringify({ 'QuestionDetails':QuestionObj})
    }).then(response => response.json()).then(data => {
      console.log(data.options)
      console.log(data.questions)
      setQuestions(data.questions)
      setOptions(data.options)
    });

  },[]);
  

  return (
    <div>
        <Navbar></Navbar>
        <div className='first-container'>
            <div className='h01'>Grade {location.pathname.split("/")[3].replaceAll("%20", " ")} - {location.pathname.split("/")[2].replaceAll("%20", " ")} 
            </div>
            <div className='h02'>{location.pathname.split("/")[4].replaceAll("%20", " ")}
            </div>
            <div className='Question-container'>
              {questions === null? <h1>
                No Questions
              </h1>:
              Object.keys(questions).map((question, index)=> (
                <QuestionContainer index={questions[question].QuestionID} question={questions[question].QuestionText} options={options[question]}/>
              ))}

            </div>
            <div className='Other-Box'>
                <div className='Remaining-questions'>
                    <p className='QR-label'>Questions Remaining : </p>
                    {remainingQuestions}
                </div>
                <div className='Time-remaining'>
                    <p className='Time-label'>Time Remaining :</p>
                    {formatTime(remainingTime)}
                </div>
            </div>
            <div className='Submit-box'>
                <div className='Submit'>
                    <Link to={`/quiz-results?score=${totalScore}&correct=${correctAnswers}`} style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Submit</Link>
                </div>
            </div>
        </div>
    </div>
  );
};

function QuestionContainer({index, question, options}){

  return (
      <div key={index} className='question'>
          <div className='Q-Number'>Question  {`${index + 1}`}:</div>
          <label className='Qs'>{question}</label>
          <ul className='options'>
              {options.map((option, key) => (
                  <li key={key} className="option">
                      <input type="radio" id={`option-${key}`} name={`question-${index}`} value={option}  />
                      <label htmlFor={`option-${key}`}>{option}</label>
                  </li>
              ))}
          </ul>
      </div>
  )
};

// onChange={() => handleOptionSelect(index, i)}
// checked={selectedOptions[index] === i}
export default QuizPage;
