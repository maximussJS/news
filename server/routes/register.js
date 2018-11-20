const router = require('express').Router()

router.get('/', (req,res) => {
  res.json({
    ok: true
  })
})

router.post('/', (req,res) => {
  res.json({
    ok : true
  })
})

module.exports = router