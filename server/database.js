const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true
})

mongoose.Promise = global.Promise

mongoose.connection.on('error', () => console.log('DB: ERROR'))
                   .once('open', () => console.log('DB: OK'))