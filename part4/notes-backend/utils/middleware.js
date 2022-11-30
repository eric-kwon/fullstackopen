const { response } = require("../app")

const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('METHOD: ', req.method)
  logger.info('PATH: ', req.path)
  logger.info('BODY: ', req.body)
  logger.info('-----')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'UNKNOWN ENDPOINT' })
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'MALFORMATTED ID' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token'
    })
  } else if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'token expired'
    })
  }

  next(err)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}