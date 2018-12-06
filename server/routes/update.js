const router = require('express').Router()
const User = require('../models').User
const serverError = require('../utils/error').serverError
const {VerifyToken,GenerateToken} = require('../utils/security')
const {errorResponse} = require('../utils/response')

router.put('/', async (req,res) => {
   try {
     const user = VerifyToken(req.headers.authorization).user
     console.log('user : ' + user + ' req : ' + req.body)
     if(!user) return res.status(401).json(errorResponse('Invalid token'))
     else {
       const result = await User.updateOne({
         _id : user._id
       }, {
         $set : req.body
       })
       if(!result) return serverError('User.Update Error',res)
       else {
         const token = GenerateToken(result)
         if (!token) return serverError('GenerateToken Error', res)
         else {
           console.log('res ' + JSON.stringify(result))
           return res.status(200).json({
             success : true,
             token : token
           })
         }
       }
     }
   }
   catch (e) {
     serverError(e,res)
   }
})

module.exports = router