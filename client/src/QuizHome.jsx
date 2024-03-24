import { useEffect, useRef, useState } from 'react';
import './QuizHome.css';
import searchIcon from './Images/SearchIcon.svg';
import Maths from './Images/MathsGrade8.jpeg';
import Geo from './Images/GeoGrade8.jpeg';
import Sci from './Images/SciGrade8.jpeg';
import Navbar from './component/Navbar';
import LessonList from './LessonList';
import QuizPage from './QuizPage';
import { Link } from 'react-router-dom';
import Footer from './component/Footer';

const QuizHome = () => {

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleGrade8BoxClick = (subject) => {
    setSelectedSubject({ grade: 'Grade 8', subject });
    setSelectedLesson(null);
  };

  const handleGrade9BoxClick = (subject) => {
    setSelectedSubject({ grade: 'Grade 9', subject });
    setSelectedLesson(null);
  };

  function handleLesson(lesson){
    setSelectedLesson(lesson);
  }

  return (
    <div>
      <Navbar/> 
      <div className="main-container">
        <div className="search-grade-container">
          <div className="search-container">
            <div className='search-text'>
              <input type="text" placeholder="Search..." />
            </div>
            <button><img src={searchIcon} alt="Search" /></button>
          </div>
          <div className="grade8-label">
          Grade 8
          </div>
          </div>
          <div className="box-container">
            <Link to={`/LessonList/${'Mathematics'}/${'8'}`}>
            <div className="box" onClick={() => handleGrade8BoxClick('Mathematics')} >
              <img src={Maths} alt="Maths" />
              <label>Mathematics</label>
            </div>
            </Link>
            <Link to={`/LessonList/${'Geography'}/${'8'}`}>
            <div className="box" onClick={() => handleGrade8BoxClick('Geography')}>
              <img src={Geo} alt="Geography" />
              <label>Geography</label>
            </div>
            </Link>
            <Link to={`/LessonList/${'Science'}/${'8'}`}>
            <div className="box" onClick={() => handleGrade8BoxClick('Science')}>
              <img src={Sci} alt="Science" />
              <label>Science</label>
            </div>
            </Link>
          </div>
          <div className="grade9-label">
          Grade 9
          </div>
          <div className="box-container">
          <Link to={`/LessonList/${'Mathematics'}/${'9'}`}>
            <div className="box" onClick={() => handleGrade9BoxClick('Mathematics')} >
              <img src={Maths} alt="Maths" />
              <label>Mathematics</label>
            </div>
            </Link>
            <Link to={`/LessonList/${'Geography'}/${'9'}`}>
            <div className="box" onClick={() => handleGrade9BoxClick('Geography')}>
              <img src={Geo} alt="Geography" />
              <label>Geography</label>
            </div>
            </Link>
            <Link to={`/LessonList/${'Science'}/${'9'}`}>
            <div className="box" onClick={() => handleGrade9BoxClick('Science')}>
              <img src={Sci} alt="Science" />
              <label>Science</label>
            </div>
            </Link>
          </div>
        </div>
        {selectedSubject && !selectedLesson && (
          <div>
            {/* Render LessonList for the selected subject */}
            <LessonList subject={selectedSubject} handleLessonClick={handleLesson()} />
          </div>
        )}
        {selectedLesson && (
          <div>
            <QuizPage lesson={selectedLesson} />
          </div>
        )}
        <Footer/>
      </div>
  );
}

export default QuizHome;