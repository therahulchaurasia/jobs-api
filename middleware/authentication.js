const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors/index')
const authenticationMiddleware = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Failed to authenticate user')
  }

  const token = authHeader.split(' ')[1]
  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET)
    console.log(payload)
    req.user = { userId: payload.userId, name: payload.name }
    next() //! Very Very important. The controller code won't parse if you don't pass next inside the middleware
  } catch (error) {
    throw new UnauthenticatedError('Failed to authenticate user')
  }
}

module.exports = authenticationMiddleware
