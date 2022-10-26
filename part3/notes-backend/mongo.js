const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://rnjsqudghk:${password}@cluster0.rblbind.mongodb.net/noteApp?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

mongoose
  .connect(url)
  .then((result) => {
    Note.find({}).then(result => {
      result.forEach(note => {
        console.log(note)
      })
    })
  })
  .then(() => {
    console.log('searched!')
    mongoose.connection.close()
  })
  .catch((err) => console.log(err))