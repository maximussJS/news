const router = require('express').Router()
const User = require('../../models').User
const {serverError} = require('../../utils/error')
const {VerifyToken} = require('../../utils/security')
const {errorResponse,successResponse} = require('../../utils/response')

router.delete('/', async (req,res) => {
   try {
     const user = VerifyToken(req.headers.authorization).user
     if(!user) return res.status(401).json(errorResponse('Invalid token'))
     else {
       const result = await User.remove({
         _id : user._id
       })
       if(!result) return serverError('Deleting User Error',res)
       else return res.status(200).json(successResponse('Account was deleted'))
     }
   }
   catch (e) {
      serverError(e,res)
   }
})

module.exports = router