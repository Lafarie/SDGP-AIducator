import React from 'react';
import './QuizPage.css'; 


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

  return (
    <div>
      <h1>Quiz for {lesson}</h1>
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
