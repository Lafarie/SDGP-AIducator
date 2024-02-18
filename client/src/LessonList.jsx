import React from 'react';
import './QuizHome.css';

const LessonList = ({ subject }) => {
  // Define lesson data
  const lessonData = {
    Mathematics: [
      'Lesson 1: Geometry',
      'Lesson 2: Algebra',
      'Lesson 3: Calculus',
      // Add more lessons 
    ],
    Geography: [
      'Lesson 1: Earth Sciences',
      'Lesson 2: Human Geography',
      'Lesson 3: Physical Geography',
      // Add more lessons 
    ],
    Science: [
      'Lesson 1: Biology',
      'Lesson 2: Chemistry',
      'Lesson 3: Physics',
      // Add more lessons 
    ],
  };

  // Get the list of lessons for the selected subject
  const lessons = lessonData[subject] || [];

  return (
    <div className="lesson-list">
      <h2>{subject} Lessons</h2>
      <ul>
        {lessons.map((lesson, index) => (
          <li key={index}>{lesson}</li>
        ))}
      </ul>
    </div>
  );
};

export default LessonList;

