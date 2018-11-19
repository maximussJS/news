const mongoose = require('mongoose')
const urlSlugs = require('mongoose-url-slugs')
const tr = require('transliter')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type : String,
    required: true,
  },
  instagram: {
    type: String,
    unique: true
  },
  facebook: {
    type: String,
    unique: true,
  },
  avaUrl: {
    type:String
  },
  github: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    required: true
  }
})

schema.plugin(urlSlugs('name',{
  field: 'url',
  generator: text => tr.slugify(text)
}))

module.exports = mongoose.model('User',schema)