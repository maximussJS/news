const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Encrypt  = password => bcrypt.hashSync(password,10)

const GenerateToken  = user => jwt.sign( {user : user }, process.env.SECRET)

const VerifyToken  = token => jwt.verify(token, process.env.SECRET)

const VerifyHash = (password,hash) => bcrypt.compareSync(password,hash)

module.exports = {
  Encrypt,
  GenerateToken,
  VerifyToken,
  VerifyHash
}