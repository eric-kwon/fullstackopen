require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    tokens['body'](req, res)
  ].join(' ')
}))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(peoples => {
    response.json(peoples)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(people => {
      response.json(people)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPeople => {
      response.json(savedPeople)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(request.params.id, { name, number }, { returnDocument: 'after', runValidators: true }).then(result => {
    response.json(result)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end()
  })
})

app.get('/info', (request, response) => {
  Person.find({}).then(result => {
    const count = result.length
    const currentDateTime = new Date()
    response.send(`<p>Phonebook has info for ${count} people <br />${currentDateTime}</p>`)
  })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: 'unknown endpoint'
  })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`)
})