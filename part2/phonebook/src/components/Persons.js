import Person from './Person'

const Persons = ({ namesToShow, deletePerson }) => {
  return (
    <ul>
      {namesToShow.map(person =>
        <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id, person.name)} />
      )}
    </ul>
  )
}

export default Persons