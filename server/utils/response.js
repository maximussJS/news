const errorResponse = message => ({
  success : false,
  message
})

const successResponse = message =>({
  success: true,
  message
})

module.exports = {
  successResponse,
  errorResponse
}