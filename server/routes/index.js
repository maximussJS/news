const router = require('express').Router()

router.use('/', require('./home'))
router.use('/login', require('./login'))
router.use('/register', require('./register'))
router.use('/user', require('./user'))
router.use('/update', require('./update'))
router.use('/delete', require('./delete'))

module.exports = router