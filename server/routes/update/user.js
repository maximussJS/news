const router = require('express').Router()
const User = require('../../models/index').User
const serverError = require('../../utils/error').serverError
const {VerifyToken,GenerateToken,VerifyHash,Encrypt} = require('../../utils/security')
const {errorResponse} = require('../../utils/response')

router.put('/', async (req,res) => {
   try {
     const user = VerifyToken(req.headers.authorization).user
     if(!user) return res.status(401).json(errorResponse('Invalid token'))
     else {
       const update = req.body
       if(update.newPassword) {
         if (!update.password) return res.status(401).json(errorResponse('You did not enter an old password'))
         else {
           if (update.password.length < 8 && update.password.length > 20) return res.status(401).json(errorResponse('Invalid old password'))
           if (update.newPassword.length < 8 && update.newPassword.length > 20) return res.status(401).json(errorResponse('Invalid new password'))
           const old = await User.findOne({
             _id: user._id
           })
           if (!old) return serverError('No old userId in token', res)
           if (!VerifyHash(update.password, old.password)) return res.status(401).json(errorResponse('Invalid old password'))
           else update.password = Encrypt(update.newPassword)
         }
       }
       const result = await User.updateOne({
         _id : user._id
       }, {
         $set : update
       })
       if(!result) return serverError('User.Update Error',res)
       else {
         const updated = await User.findOne({
           _id : user._id
         })
         if(!updated) return serverError('Cannot find updated user',res)
         else {
           const token = GenerateToken(updated)
           if (!token) return serverError('GenerateToken Error', res)
           else return res.status(200).json({
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