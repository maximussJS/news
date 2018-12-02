const router = require('express').Router()
const User = require('../models').User
const {successResponse,errorResponse} = require('../utils/response')
const {serverError} = require('../utils/error')
const {Encrypt,GenerateToken} = require('../utils/security')

router.get('/', (req,res) => res.status(200).json(successResponse('OK')))

router.post('/', async (req,res) => {
  try {
    const {name,email,password,age,country,gender} = req.body
    if(!name) return res.status(400).json('Name is required')
    if(!email) return res.status(400).json('Email is required')
    if(!password) return res.status(400).json('Password is required')
    if(!age) return res.status(400).json('Age is required')
    if(!country) return res.status(400).json('Country is required')
    if(name.length > 16) return res.status(400).json(errorResponse('Name length is too big'))
    if(name.length < 2) return res.status(400).json(errorResponse('Name length is too small'))
    if(email.length > 20) return res.status(400).json(errorResponse('Email length is too big'))
    if(email.length < 8) return res.status(400).json(errorResponse('Email length is too small'))
    //if(email.includes('@')) return res.status(400).json(errorResponse('@ symbol must be in email'))
    if(password.length > 20) return res.status(400).json(errorResponse('Password length is too big'))
    if(password.length < 8) return res.status(400).json(errorResponse('Password length is too small'))
    if(country.length > 16) return res.status(400).json(errorResponse('Country length is too big'))
    if(country.length < 3) return res.status(400).json(errorResponse('Country length is too small'))
    if(isNaN(Number(age))) return res.status(400).json(errorResponse('Age is invalid'))
    if(age > 70) return res.status(400).json(errorResponse('You are very old, go home'))
    if(age < 6) return res.status(400).json(errorResponse('You are very small, go to Kindergarten'))
    const user = await User.findOne({email : email})
    if(!user) {
       const hash = Encrypt(password)
       if(!hash) serverError('Hash password failed',res)
       const usr = await User.create({
         password : hash,
         name : name,
         email : email,
         age : age,
         country : country,
         gender : gender
       })
       if(!usr) serverError('User.create failed',res)
       else {
         const token = GenerateToken(usr)
         return res.status(200).json({
           success : true,
           message : 'User created',
           token : token
         })
       }
    }
    else return res.status(401).json(errorResponse('Email is already taken'))
  }
  catch (e) {
    serverError(e,res)
  }
})

module.exports = router