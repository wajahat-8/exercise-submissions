import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState("");
  const [newNumber,setNewNumber]=useState("");
  const [show,setShow]=useState("");
 

  const handleSubmit = (event) => {
    event.preventDefault();
    const newObject = { name: newName,
      number:newNumber,
      id:persons.length+1,
     };

    if (persons.some((person) => person.name === newObject.name)) {
      alert(`${newName} already exists`);
    } else {
      setPersons(persons.concat(newObject));
    }

    setNewName(""); 
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with<input value={show} onChange={(e)=>setShow(e.target.value)}/></div>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>number:
        <input value={newNumber} onChange={(e)=>setNewNumber(e.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(person=>person.name.toLowerCase().includes(show.toLowerCase())).map((person) => (
        <div key={person.id}>{person.name} {person.number}</div>
      ))}
    </div>
  );
};

export default App;
