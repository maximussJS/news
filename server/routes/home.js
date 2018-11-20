const router = require('express').Router()

router.get('/', (req,res) => {
  console.log(req.body)
  res.send(200)
})

module.exports = router