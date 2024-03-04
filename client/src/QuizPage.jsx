import React from 'react';
import './QuizPage.css'; 
import { useLocation } from 'react-router-dom';


const QuizPage = ({ lesson }) => {
 
  // Placeholder for quiz questions
  const quizQuestions = [

    {
      question: 'What is the definition of a triangle?',
      options: ['A polygon with three sides', 'A polygon with four sides', 'A polygon with five sides'],
      correctAnswer: 'A polygon with three sides'
    },
    // Add more questions here
  ];

  let location = useLocation()

  return (
    <div>
      {/* <h1>Quiz for {lesson}</h1> */}
      <h1>Grade {location.pathname.split("/")[3].replaceAll("%20", " ")} - {location.pathname.split("/")[2].replaceAll("%20", " ")} </h1>
      <h2>{location.pathname.split("/")[4].replaceAll("%20", " ")}</h2>
      {/* Render quiz questions here */}
      {quizQuestions.map((question, index) => (
        <div key={index}>
          <h3>{question.question}</h3>
          <ul>
            {question.options.map((option, i) => (
              <li key={i}>{option}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuizPage;
