import { useEffect, useRef, useState } from 'react';
import './QuizHome.css';
import searchIcon from './Images/SearchIcon.svg';
import Maths from './Images/MathsGrade8.jpeg';
import Geo from './Images/GeoGrade8.jpeg';
import Sci from './Images/SciGrade8.jpeg';
import Navbar from './component/Navbar';
import LessonList from './LessonList';
import { Link } from 'react-router-dom';

const QuizHome = () => {

  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleBoxClick = (subject) => {
    setSelectedSubject(subject);
  };

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
            <Link to={'/LessonList'}>
            <div className="box" onClick={() => handleBoxClick('Mathematics')} >
              <img src={Maths} alt="Maths" />
              <label>Mathematics</label>
            </div>
            </Link>
            <Link to={'/LessonList'}>
            <div className="box" onClick={() => handleBoxClick('Geography')}>
              <img src={Geo} alt="Geography" />
              <label>Geography</label>
            </div>
            </Link>
            <Link to={'/LessonList'}>
            <div className="box" onClick={() => handleBoxClick('Science')}>
              <img src={Sci} alt="Science" />
              <label>Science</label>
            </div>
            </Link>
          </div>
          <div className="grade9-label">
          Grade 9
          </div>
          <div className="box-container">
            <div className="box">
              <img src={Maths} alt="Maths" />
              <label>Mathematics</label>
            </div>
            <div className="box">
              <img src={Geo} alt="Geography" />
              <label>Geography</label>
            </div>
            <div className="box">
              <img src={Sci} alt="Science" />
              <label>Science</label>
            </div>
          </div>
        </div>
        {selectedSubject && (
          <div>
            {/* Render LessonList for the selected subject */}
            <LessonList subject={selectedSubject} />
          </div>
        )}
      </div>
  );
}

export default QuizHome;
