require('./dotenv')
const express = require('express')

const app = express()

app.get('/',(req,res) => res.send('hi'))

app.listen(process.env.PORT,() => console.log(`Listening on ${process.env.PORT}`))
