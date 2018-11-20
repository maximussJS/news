const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Encrypt  = async password => {
  try {
    return await bcrypt.hash(password, process.env.SALT)
  }
  catch (e) {
      console.error(e)
      return {
        error : e
      }
  }
}

const GenerateToken  = async userID => {
  try {
    const userData = {
      id: userID
    }
    return await jwt.sign(userData, process.env.SECRET)
  }
  catch (e) {
    console.error(e)
    return {
      error : e
    }
  }
}

const VerifyToken  = async token => {
  try {
    const payload = await jwt.verify(token, process.env.SECRET)
    return {
      id: payload.id
    }
  }
  catch (e) {
    console.error(e)
    return {
      error : e
    }
  }
}

const VerifyHash = async (password,hash) => {
  try {
    return await bcrypt.compare(password,hash)
  }
  catch (e) {
    console.error(e)
    return {
      error : e
    }
  }
}

module.exports = {
  Encrypt,
  GenerateToken,
  VerifyToken,
  VerifyHash
}