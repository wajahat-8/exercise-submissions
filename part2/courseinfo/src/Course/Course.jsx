import React from 'react'
import Header from './Header'
import Part from './Content/Part'

const Course = ({ course }) => {
    return (
        <>
            {course.map((course) =>
                <div key={course.id}>
                    <Header header={course.name} />

                    <Part part={course.parts} />
                </div>
            )}
        </>
    )
}

export default Course
