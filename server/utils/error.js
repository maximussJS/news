const serverError = (err,res) => {
  console.error(err)
  return res.status(500).json({
    message : 'Server Error'
  })
}

module.exports = {
  serverError
}