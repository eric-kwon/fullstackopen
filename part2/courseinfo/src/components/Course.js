import React from 'react'
import Header from './Header'
import Content from './Content'

const Course = ({ courses }) => {
    const courseMap = courses.map(course =>
      <div key={course.id}>
        <Header course={course} />
        <Content course={course} />
      </div>
    )
  
    return (
      <div>
        {courseMap}
      </div>
    )
  }

export default Course