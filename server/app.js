require('./dotenv')
require('./database')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const busboyBodyParser = require('busboy-body-parser')
const cors = require('cors')
const helmet = require('helmet')

const app = express()

app.use(morgan('dev'))

app.use(cors())

app.use(helmet())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(busboyBodyParser({
  limit : '5mb'
}))

app.use('/' , require('./routes'))

app.listen(process.env.PORT,() => console.log(`Listening on ${process.env.PORT}`))
