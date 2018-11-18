const dotenv = require('dotenv')
const root = require('path').join.bind(this, __dirname)

dotenv.config({
     path: root('.env') 
})