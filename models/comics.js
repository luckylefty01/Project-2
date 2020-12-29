//==Dependencies

const mongoose = require('mongoose')
const Schema = mongoose.Schema

//==Schema

const comicsSchema = Schema ({
  name: {type: String, required: True },
  description: String,
  img: String,
  price: {type: Number, min: 0 },
  qty: { type: Number, min: 0}
})

//==Export

const Comics = mongoose.model('Comics',
comicsSchema)
module.exports = comicsSchema
