const serverError = (err,res) => {
  console.error(err)
  res.status(500).json({
    message : 'Server Error'
  })
}

module.exports = {
  serverError
}