const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection
require('dotenv').config()
const PORT = process.env.PORT || 3003
// models
const Comics = require('./models/comics')
const productsSeed = require('./models/seed')

// database
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI))
db.on('disconnected', () => console.log('mongo disconnected'))

// middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))
// app.get('/', (req, res) => {
//   res.send('Hello World')
// })

// controller
const productsController = require('./controllers/products_controller')
app.use('/products', productsController)

app.get('/',(req, res) => {
  res.redirect('/products')
})

// seed
app.get('/config/seed', (req, res) => {
    Comics.create(productsSeed, (err, createdProducts) => {
        console.log(createdProducts,'\n\n✅ Products created!')
        res.redirect('/products')
    })
})


app.listen(PORT, () => {
  console.log('Listening on port: ', PORT)
})
