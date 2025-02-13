import React from 'react'


const Part = ({ part }) => {
  const total = part.reduce((sum, current) => sum + current.exercises, 0);
  return (
    <>
      {part.map((part) => (

        <p  key={part.id}>{part.name}:  {part.exercises}</p>


      ))}
      <h2>total of {total} exercises</h2>
    </>
  )
}

export default Part