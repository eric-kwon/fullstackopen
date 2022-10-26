import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import personService from './services/person'
import './index.css'

const App = () => {
  useEffect(() => {
    personService
      .getAll()
      .then(initialEntry => setPersons(initialEntry))
  }, [])

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameToShow, setNameToShow] = useState('')
  const [notification, setNotification] = useState(null)
  const namesToShow = nameToShow ? persons.filter(person => person.name.indexOf(nameToShow) !== -1) : persons

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.map(person => person.name).indexOf(newName) !== -1) {
      const existingPerson = persons.find(p => p.name === personObject.name)

      if (window.confirm(`${existingPerson.name} is already added to phonebook, please the old number with a new one?`)) {
        personService
          .update(existingPerson.id, personObject)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : updatedPerson))
            setNewName('')
            setNewNumber('')
            handleNotification(`Updated ${updatedPerson.name}`)
          })
          .catch(error => {
            const errorMessage = error.response.data.error
            handleNotification(errorMessage)
          })
      }
    } else {
      personService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
          handleNotification(`Added ${newPerson.name}`)
        })
        .catch(error => {
          const errorMessage = error.response.data.error
          handleNotification(errorMessage)
        })
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(response => {
          console.log(response)
          alert(`${name} has been deleted`)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          const errorMessage = error.response.data.error
          handleNotification(errorMessage)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNameToShow(event.target.value)
  }

  const handleNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter onChange={handleFilterChange} />

      <h2>Add New</h2>
      <PersonForm onSubmit={addPerson} nameValue={newName} nameChange={handleNameChange} numberValue={newNumber} numberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons namesToShow={namesToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App