const router = require('express').Router()
const serverError = require('../utils/error').serverError
const verifyToken = require('../utils/security').VerifyToken

router.get('/', async (req,res) => {
  try {
    const user = verifyToken(req.headers.authorization).user
    return res.status(200).json( user ? {
      auth : true,
      user
    } : {
      auth : false
    })
  }
  catch (e) {
    serverError(e,res)
  }
})

module.exports = router