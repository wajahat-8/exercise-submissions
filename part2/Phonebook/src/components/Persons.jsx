import React from 'react'


const Persons = ({ persons, show, handleDelete }) => (
    <div>
        {persons
            .filter((person) => person.name && person.name.toLowerCase().includes(show.toLowerCase()))
            .map((person) => (
                <div key={person.id}>
                    {person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button>
                </div>
            ))}
    </div>
);


export default Persons;