import React from 'react'


const Persons = ({ persons, show }) => (
    <div>
        {persons
            .filter((person) => person.name.toLowerCase().includes(show.toLowerCase()))
            .map((person) => (
                <div key={person.id}>
                    {person.name} {person.number}
                </div>
            ))}
    </div>
);


export default Persons