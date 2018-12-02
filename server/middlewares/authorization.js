const {VerifyToken} = require('../utils/security')
const User = require('../models').User
const {errorResponse} = require('../utils/response')
const serverError = require('../utils/error').serverError

const checkAuth = async (req, res, next) => {
  if (!req.headers.authorization) return res.status(400).json(errorResponse('Token not found'))
  try {
    const user = await User.findById(VerifyToken(req.headers.authorization).user.id)
    if (!user) return res.status(404).json(errorResponse('User not found'))
    next()
  }
  catch (e) {
    serverError(e,res)
  }
}

module.exports = {
  checkAuth
}