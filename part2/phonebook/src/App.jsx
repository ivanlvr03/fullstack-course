import { useState } from 'react'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map(person => (
        <li key={person.id}>{person.name} {person.number}</li>
      ))}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
   { name: 'Arto Hellas', number: '040-123456', id: 1 },
   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    

    

  const addPerson = (event) => {
    event.preventDefault()
  const nameExists = persons.some(person => person.name === newName)
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}


export default App 