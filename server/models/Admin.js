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
  avaUrl: {
    type:String,
    default : process.env.DEFAULT_ADMIN_AVATAR
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default : true
  }
})

schema.plugin(urlSlugs('name',{
  field: 'url',
  generator: text => tr.slugify(text)
}))

module.exports = mongoose.model('Admin',schema)