const ApiError = require('../helpers/ApiError')
const httpStatus = require('../helpers/httpStatus')

const errorConverter = (err, req, res, next) => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
    const message = error.statusCode === httpStatus.NOT_FOUND ? 'Not Found' : 'Internal server error' // para no mostrar informacion de la base de datos (puede mejorarse)
    error = new ApiError(statusCode, message, false)
  }
  next(error)
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const { statusCode, message, status } = err

  res.locals.errorMessage = err.message

  const response = {
    code: statusCode,
    status: status || false,
    message,
  }

  res.status(statusCode).send(response)
}

module.exports = {
  errorConverter,
  errorHandler,
}
