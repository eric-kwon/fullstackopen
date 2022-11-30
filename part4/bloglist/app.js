const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const { errorHandler, userExtractor } = require('./utils/middleware')
const logger = require('./utils/logger')

logger.info('CONNECTING TO', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('CONNECTED TO MONGODB')
  })
  .catch((error) => {
    logger.error('ERROR CONNECTING TO MONGODB: ', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/login', loginRouter)
app.use('/api/blogs', userExtractor, blogsRouter)
app.use('/api/users', usersRouter)

app.use(errorHandler)

module.exports = app