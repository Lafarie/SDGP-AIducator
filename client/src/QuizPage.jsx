import React, { useState, useEffect } from 'react';
import './QuizPage.css'; 
import { useLocation,Link } from 'react-router-dom';
import Navbar from './component/Navbar';
import axios from 'axios';


const QuizPage = ({ lesson }) => {
    const [quizQuestions, setQuizQuestions] = useState([]); // State to store quiz questions

    useEffect(() => {
        // Function to fetch quiz questions from the backend
        const fetchQuizQuestions = async () => {
          try {
            // Make an HTTP GET request to fetch quiz questions for the selected lesson
            const response = await axios.get(`/api/quiz-questions/${lesson}`);
            // Update the state with the fetched quiz questions
            setQuizQuestions(response.data);
          } catch (error) {
            console.error('Error fetching quiz questions:', error);
          }
        };

        // Call the fetchQuizQuestions function when the component mounts
        fetchQuizQuestions();

    }, [lesson]);
  // Placeholder for quiz questions
//   const quizQuestions = [

//     {
//       question: 'What is the definition of a triangle?',
//       options: ['A polygon with two sides','A polygon with three sides', 'A polygon with four sides', 'A polygon with five sides'],
//       correctAnswer: 'A polygon with three sides'
//     },
//     {
//       question: 'The sum of the angles in a triangle?',
//       options: ['90 degrees', '180 degrees', '270 degrees','360 degrees'],
//       correctAnswer: '180 degrees'
//     },
//     {
//       question: 'A quadrilateral with all four right angles is called?',
//       options: ['Square', 'Rectangle', 'Rhombus','Trapezium'],
//       correctAnswer: 'Square'
//     },
//     {
//         question: 'The opposite angles in a parallelogram?',
//         options: ['Acute', 'Obtuse', 'Congruent','Supplementary'],
//         correctAnswer: 'Congruent'
//       },
//     {
//         question: 'The diameter of a circle is twice the length of its?',
//         options: ['Circumference', 'Radius', 'Area','None of the above'],
//         correctAnswer: 'Square'
//     },
//     {
//         question: 'If two lines intersect at a right angle, they are considered?',
//         options: ['Parallel', 'Perpendicular', 'Intersecting','None of the above'],
//         correctAnswer: 'Square'
//     },
//     {
//         question: 'The measure of a straight angle is?',
//         options: ['90 degrees', '180 degrees', '270 degrees','360 degrees'],
//         correctAnswer: '90 degrees'
//     },
//     {
//         question: 'A triangle with all sides equal is called?',
//         options: ['Scalene', 'Isosceles', 'Equilateral','Right-angled'],
//         correctAnswer: 'Equilateral'
//     },
//     {
//         question: 'The diagonal of a square divides it into two?',
//         options: ['Triangles of different areas', 'Triangles of equal areas', 'Rectangles','None of the above'],
//         correctAnswer: 'Triangles of equal areas'
//     },
//     {
//         question: 'In a right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides. This is known as?',
//         options: ['Pythagorean theorem', 'Law of cosines', 'Law of sines','Triangle inequality theorem'],
//         correctAnswer: 'Pythagorean theorem'
//     },
//   ];

  let location = useLocation()

  // State to keep track of selected options
  const [selectedOptions, setSelectedOptions] = useState(new Array(quizQuestions.length).fill(null));

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
  const handleSubmit = () => {
  };

  return (
    <div>
        <Navbar></Navbar>
        <div className='first-container'>
            <div className='h01'>Grade {location.pathname.split("/")[3].replaceAll("%20", " ")} - {location.pathname.split("/")[2].replaceAll("%20", " ")} 
            </div>
            <div className='h02'>{location.pathname.split("/")[4].replaceAll("%20", " ")}
            </div>
            <div className='Question-container'>
                {/* Rendering quiz questions here */}
                {quizQuestions.map((question, index) => (
                <div key={index} className='question'>
                    <div className='Q-Number'>Question  {`${index + 1}`.padStart(2, '0')}:</div>
                    <label className='Qs'>{question.question}</label>
                    <ul className='options'>
                        {question.options.map((option, i) => (
                            <li key={i} className="option">
                                <input type="radio" id={`option-${index}-${i}`} name={`question-${index}`} value={option} onChange={() => handleOptionSelect(index, i)}checked={selectedOptions[index] === i} />
                                <label htmlFor={`option-${index}-${i}`}>{option}</label>
                            </li>
                        ))}
                    </ul>
                </div>
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

function QuestionContainer(){

  return (
      <div key={index} className='question'>
          <div className='Q-Number'>Question  {`${index + 1}`.padStart(2, '0')}:</div>
          <label className='Qs'>{question}</label>
          <ul className='options'>
              {question.options.map((option, i) => (
                  <li key={i} className="option">
                      <input type="radio" id={`option-${index}-${i}`} name={`question-${index}`} value={option} onChange={() => handleOptionSelect(index, i)}checked={selectedOptions[index] === i} />
                      <label htmlFor={`option-${index}-${i}`}>{option}</label>
                  </li>
              ))}
          </ul>
      </div>
  )
}

export default QuizPage;
