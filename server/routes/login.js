const router = require('express').Router()
const serverError = require('../utils/error').serverError
const {VerifyHash,GenerateToken} = require('../utils/security')
const errorResponse = require('../utils/response').errorResponse
const User = require('../models').User

router.post('/', async (req,res) => {
  try {
    const {email,password} = req.body
    const user = await User.findOne({email : email})
    if(!user) return res.status(401).json(errorResponse('Invalid login or password'))
    else {
      if(!VerifyHash(password,user.password)) return res.status(401).json(errorResponse('Invalid login or password'))
      else {
        const token = GenerateToken(user)
        return res.status(200).json({
          success : true,
          token
        })
      }
    }
  }
  catch (e) {
    serverError(e,res)
  }
})

module.exports = router