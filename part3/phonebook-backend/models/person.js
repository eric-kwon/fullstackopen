require('dotenv').config()

const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('successfully connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB: ', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is a required field']
  },
  number:  {
    type: String,
    validate: {
      validator: (v) => {
        return /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g.test(v)
      },
      message: props => `${props.value} is not a value phone number!`
    },
    required: [true, 'Number is a required field']
  }
})

personSchema.set('toJSON', {
  transform: (document, returned) => {
    returned.id = returned._id.toString()
    delete returned._id
    delete returned.__v
  }
})

module.exports = mongoose.model('Person', personSchema)