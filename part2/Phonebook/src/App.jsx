import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import personServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([
  ])

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [show, setShow] = useState("");
  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        console.log(initialPersons)
        setPersons(initialPersons)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const newObject = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find((person) => person.name === newObject.name);

    if (existingPerson) {
      let confirmed = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmed) {
        const updatedPerson = { ...existingPerson, number: newObject.number };
        personServices.update(existingPerson.id, updatedPerson).then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== existingPerson.id ? person : returnedPerson
            )
          );
        });
      }
    } else {
      // Create a new contact if not existing
      personServices.create(newObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
    }

    // Clear input fields after submission
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id);
    if (!personToDelete) return;
    const confirmDelete = window.confirm(`Delete ${personToDelete.name}`)
    if (!confirmDelete) return;

    personServices
      .remove(id)
      .then(() => { setPersons(persons.filter(person => person.id !== id)) })
      .catch((error) => {
        console.error("Error deleting person:", error);
        alert("Person is already deleted or an error occurred.");
      });
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter show={show} setShow={setShow} />
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>

      <Persons persons={persons} show={show} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
