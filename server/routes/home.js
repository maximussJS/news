const router = require('express').Router()
const New = require('../models').New
const serverError = require('../utils/error').serverError

router.get('/', async(req,res) => {
  try {
    const news = await New.find().sort({
      date : -1
    })
    return res.status(200).json({
      news : news
    })
  }
  catch (e) {
    serverError(e,res)
  }
})

module.exports = router