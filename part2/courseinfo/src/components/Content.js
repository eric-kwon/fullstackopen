import React from 'react'
import Part from './Part'
import Total from './Total'

const Content = ({ course }) => {
  const partsMap = course.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)

  console.log(total)

  return (
    <table>
      <tbody>
        {partsMap}
        <Total total={total} />
      </tbody>
    </table>
  )
}

export default Content