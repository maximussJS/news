const mongoose = require('mongoose')
const urlSlugs = require('mongoose-url-slugs')
const tr = require('transliter')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date : {
    type : Date,
    default : new Date()
  },
  image: {
    type: String,
    default: process.env.DEFAULT_NEWS_IMAGE
  },
  source: {
    type : String
  },
  author: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  views: {
    type : Number,
    default : 0
  }
})

schema.plugin(urlSlugs('title',{
  field: 'url',
  generator: text => tr.slugify(text)
}))

module.exports = mongoose.model('New',schema)