const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url = `mongodb+srv://rnjsqudghk:${password}@cluster0.rblbind.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
  mongoose
    .connect(url)
    .then(() => {
      const person = new Person({
        name: newName,
        number: newNumber
      })

      return person.save()
    })
    .then(result => {
      console.log(`added ${result.name} ${result.number} to phonebook`)
      return mongoose.connection.close()
    })
    .catch(err => console.log(err))
} else {
  mongoose
    .connect(url)
    .then(() => {
      return Person.find({})
    })
    .then(result => {
      console.log('phonebook:')
      result.forEach(person => console.log(`${person.name} ${person.number}`))
      return mongoose.connection.close()
    })
    .catch(err => console.log(err))
}
