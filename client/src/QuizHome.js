import { useEffect, useRef, useState } from 'react';
import './QuizHome.css';
import searchIcon from './Images/SearchIcon.svg';
import Maths from './Images/MathsGrade8.jpeg';
import Geo from './Images/GeoGrade8.jpeg';
import Sci from './Images/SciGrade8.jpeg';

const QuizHome = () => {
  const history = useHistory(); 

  const handleBoxClick = () => {
    history.push('/QMaths8'); 
  };
  return (
    <div>
      <div className='navbar'>
        {/* Navigation bar */}
      </div>
      <div className="main-container">
        <div className="navbar">
          {/* Navigation bar */}
        </div>
        <div className="search-grade-container">
          <div className="search-container">
            <input type="text" placeholder="Search..." />
            <button><img src={searchIcon} alt="Search" /></button>
          </div>
          <div className="grade8-label">
          Grade 8
          </div>
          </div>
          <div className="box-container">
            <div className="box" onClick={handleBoxClick}>
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
      </div>
  );
}

export default QuizHome;
