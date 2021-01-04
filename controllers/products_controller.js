const express = require('express')
const Comics = require('../models/comics')

const products = express.Router()

//====Routes====

//index
products.get('/',(req, res) => {
  Comics.find({}, (err, foundComics) => {
    res.render('comics/index.ejs', {
      comics: foundComics
    })
  })
})

//new
products.get('/new', (req, res) => {
  res.render('comics/new.ejs')
})

//show
