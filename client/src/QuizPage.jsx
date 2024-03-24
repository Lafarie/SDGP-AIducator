import React, { useEffect, useState } from "react";
import "./QuizPage.css";
import { useLocation, Link, useParams } from "react-router-dom";
import Navbar from "./component/Navbar";
 
const QuizPage = () => {
  const { grade, subject, lesson } = useParams();
  const location = useLocation();
 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [remainingQuestions, setRemainingQuestions] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(900); // 15 minutes in seconds
 
  useEffect(() => {
    const QuestionObj = {
      gradeid: grade.replaceAll("%20", " "),
      subjectid: subject.replaceAll("%20", " "),
      lessonName: lesson.replaceAll("%20", " "),
    };
    fetch("/api/get/quiz", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ QuestionDetails: QuestionObj }),
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.message);
        setRemainingQuestions(data.message.length);
      });
  }, [grade, subject, lesson]);
 
  const handleNext = () => {
    if (selectedOption !== null) {
      // Calculate score if the answer is correct
      const currentQuestion = questions[currentQuestionIndex];
      const correctAnswerIndex = currentQuestion.CorrectAnswerIndex;
      if (selectedOption === correctAnswerIndex) {
        setTotalScore((prevScore) => prevScore + 10);
      }
 
      // Move to the next question
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
        setSelectedOption(null);
      } else {
        // End of quiz
        setSubmitted(true);
        // window.location.href="Google.com" //add redirect logic here .location params with values.
      }
    }
  };
 
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
 
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
 
    return () => clearInterval(timer);
  }, []);
 
  return (
    <div>
      <Navbar />
      <div className="first-container">
        <div className="h01">
          Grade {grade} - {subject}
        </div>
        <div className="h02">{lesson}</div>
        <div className="Question-container">
          {questions.length > 0 && currentQuestionIndex < questions.length && (
            <Question
              question={questions[currentQuestionIndex]}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          )}
          {submitted && (
            <div className="submission-message">
              <h2>Quiz submitted!</h2>
              {/* <p>Total Score: {totalScore}</p> */}
              <div className="quiz-results-link">
                <Link to={`/quiz-results?score=${totalScore}&correct=${totalScore}`} className="quiz-results-link">
                 View Results
               </Link>
              </div>
            </div>
          )}
        </div>
        <div className="sticky-container">
          <div className="Other-Box">
            <div className="Remaining-questions">
              <p className="QR-label">Questions Remaining : </p>
              {remainingQuestions - currentQuestionIndex - 1}
        </div>
        <div className="sticky-container">
          <div className="Other-Box">
            <div className="Remaining-questions">
              <p className="QR-label">Questions Remaining : </p>
              {remainingQuestions - currentQuestionIndex - 1}
            </div>
            <div className="Time-remaining">
              <p className="Time-label">Time Remaining :</p>
              {formatTime(remainingTime)}
            </div>
          </div>
          <div className="NextButton-box">
            {!submitted && (
              <div className="Next">
                <button
                  onClick={handleNext}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
            <div className="Time-remaining">
              <p className="Time-label">Time Remaining :</p>
              {formatTime(remainingTime)}
            </div>
          </div>
          <div className="NextButton-box">
            {!submitted && (
              <div className="Next">
                <button
                  onClick={handleNext}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
  );
};
 
const Question = ({ question, selectedOption, setSelectedOption }) => {
  const [questionTitle, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
 
  useEffect(() => {
    if (question) {
      setQuestion(question.QuestionText);
      setAnswers(
        question.OptionTexts.split(",").map((answer) => answer.trim())
      );
    }
  }, [question]);
 
  return (
    <div className="question">
      <div className="Q-Number">Question:</div>
      <label className="Qs">{questionTitle}</label>
      <ul className="options">
        {answers.map((answer, index) => (
          <li key={index} className="option">
            <input
              type="radio"
              id={`option-${answer}`}
              name={`question-${answer}`}
              value={answer}
              checked={selectedOption === index}
              onChange={() => setSelectedOption(index)}
            />
            <label
              className={selectedOption === index ? "blue" : ""}
              htmlFor={`option-${answer}`}
            >
              {answer}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
 
export default QuizPage;