import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import personServices from './services/persons'
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [show, setShow] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("");
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
          showMessage(`Updated ${returnedPerson.name}'s number`, 'updated');
          setNewName("");
          setNewNumber("");
        });

      }
    } else {

      personServices.create(newObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        showMessage(`Added ${returnedPerson.name}`, 'success'); // ✅ moved here
        setNewName("");
        setNewNumber("");

      }).catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
          showMessage(error.response.data.error, 'error');
        }
      })
    }



  };
  const showMessage = (message, type) => {
    setNotification(
      message
    )
    setNotificationType(type)
    setTimeout(() => {
      console.log("hi")
      setNotification(null)
      setNotificationType("");
    }, 5000)
  }
  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id);
    if (!personToDelete) return;
    const confirmDelete = window.confirm(`Delete ${personToDelete.name}`)
    if (!confirmDelete) return;

    personServices
      .remove(id)
      .then(() => { setPersons(persons.filter(person => person.id !== id)) })
      .catch((error) => {

        showMessage(`Information of ${personToDelete.name} has  already been removed from server`, 'error');
      });
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} type={notificationType} />
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
