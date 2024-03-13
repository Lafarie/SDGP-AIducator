import React from 'react';

const QMaths8 = () => {
  // Array of lessons
  const lessons = [
    'Lesson 1: Geometry',
    'Lesson 2: Pythagorean Relation',
    // Add other lessons here
  ];

  return (
    <div>
      <h1>Lesson List</h1>
      <div>
        {lessons.map((lesson, index) => (
          <button key={index}>{lesson}</button>
        ))}
      </div>
    </div>
  );
};

export default QMaths8;
