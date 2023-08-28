const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  // console.log(err, next)
  let customError = {
    statusCode: err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  }
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  if (err.name === 'CastError') {
    customError.statusCode = 404
    customError.msg = `No job with the id ${err.value} exists`
  }
  if (err.name === 'ValidationError') {
    // console.log(Object.values(err.errors))
    customError.statusCode = 400 // StatusCode.BAD_REQUEST
    customError.msg = Object.values(err.errors)
      .map((items) => items.message)
      .join(', ')
  }
  if (err.code && err.code === 11000) {
    customError.statusCode = 400 //StatusCodes.BAD_REQUEST
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
