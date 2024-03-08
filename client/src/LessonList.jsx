import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './LessonList.css';
import Navbar from './component/Navbar';
import searchIcon from './Images/SearchIcon.svg';
import {Link} from 'react-router-dom'


const LessonList = () => {
  const { subject } = useParams();

  const [displaygrade, setdisplaygrade] = useState("")

  let location = useLocation();

  // Define lesson data
  const grade8LessonData = {
    Mathematics: [
      'Lesson 1: Geometry',
      'Lesson 2: Pythagorean Relations',
      'Lesson 3: Factors',
      'Lesson 4: Fractions',
      'Lesson 5: Area',
      'Lesson 6: Angles of Triangles',
      'Lesson 7: Graphs',
      'Lesson 8: Sets',
      'Lesson 9: Volume and Capacity',
      'Lesson 10: Loci and constructions',
      'Lesson 11: Perimeter',
      'Lesson 12: Mass',
      'Lesson 13: Symmetry',
      'Lesson 14: Scale Diagrams',
      'Lesson 15: Angles of Polygons',
    ],
    Geography: [
      'Lesson 1 : Nature of the earth ',
      'Lesson 2 : The solar system',
      'Lesson 3 : Topography',
      'Lesson 4 : Landscapes',
    ],
    Science: [
      'Lesson 1 : Life cycles of living organisms',
      'Lesson 2 : Magnets ',
      'Lesson 3 : Plant parts and functions',
      'Lesson 4 : Electrolysis',
      'Lesson 5 : Density',
      'Lesson 6 : Reflection and refraction of waves',
      'Lesson 7 : Simple machines',
    ],
  };

  // Define lesson data for Grade 9
  const grade9LessonData = {
    Mathematics: [
      'Lesson 1: Geometry',
      'Lesson 2: Pythagorean Relations',
      'Lesson 3: Factors',
      'Lesson 4: Fractions',
      'Lesson 5: Area',
      'Lesson 6: Angles of Triangles',
      'Lesson 7: Graphs',
      'Lesson 8: Sets',
      'Lesson 9: Volume and Capacity',
      'Lesson 10: Loci and constructions',
      'Lesson 11: Perimeter',
      'Lesson 12: Mass',
      'Lesson 13: Symmetry',
      'Lesson 14: Scale Diagrams',
      'Lesson 15: Angles of Polygons',
    ],
    Geography: [
      'Lesson 1 : Nature of the earth ',
      'Lesson 2 : The solar system',
      'Lesson 3 : Topography',
      'Lesson 4 : Landscapes',
    ],
    Science: [
      'Lesson 1 : Life cycles of living organisms',
      'Lesson 2 : Magnets ',
      'Lesson 3 : Plant parts and functions',
      'Lesson 4 : Electrolysis',
      'Lesson 5 : Density',
      'Lesson 6 : Reflection and refraction of waves',
      'Lesson 7 : Simple machines',
    ],
  };

  useEffect(() => {
    setdisplaygrade(location.pathname.split("/")[3]);
  }, [location])

    // Determine the grade based on the subject selected
  const grade = subject.startsWith('Grade 8') ? 'Grade 8' : 'Grade 9';

  // Get the list of lessons for the selected subject and grade
  const lessons = displaygrade === "8"
    ? grade8LessonData[subject] || []
    : grade9LessonData[subject] || [];

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
          <div className="grade-label">Grade {displaygrade} - {subject}</div>
        </div>
        <div className="lesson-list">
          {lessons.map((lesson, index) => (
            <Link key={index} to={location.pathname + "/" + lesson}><button key={index} className={`lesson-button ${index % 2 === 0 ? 'even' : 'odd'}`}>{lesson}</button></Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonList;