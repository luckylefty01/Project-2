const express = require('express')
const Comics = require('../models/comics')

const products = express.Router()

//====Routes====

//index
products.get('/',(req, res) => {
  Comics.find({}, (err, foundComics) => {
    res.render('products/index.ejs', {
      comics: foundComics
    })
  })
})

//new
products.get('/new', (req, res) => {
  res.render('products/new.ejs')
})

//show
products.get('/:id', (req, res) => {
  Comics.findById(req.params.id, (err, foundComic) => {
    res.render('products/show.ejs', {
      comic: foundComic
    })
  })
})

//edit
products.get('/:id/edit', (req, res) => {
  Comics.findById(req.params.id, (err, foundComic) => {
    res.render('products/edit.ejs',{
      comic: foundComic
    })
  })
})

// create
products.post('/', (req, res) => {
  Comics.create(req.body, (err, createdComic) => {
    res.redirect(`/products`)
  })
})

// update
products.put('/:id', (req, res) => {
  Comics.findByIdAndUpdate(
    req.params.id,
    req.body, {new: true}, (err, updatedComic) => {
      res.redirect(`/products/${req.params.id}`)
    }
  )
})

//buy
products.put('/:id/buy', (req, res) => {
  Comics.findByIdAndUpdate(
    req.params.id,
    { $inc: { qty: -1 } },
    { new: true },
    (err, updatedProduct) => {
      res.redirect(`/products/${req.params.id}`)
    }
  )
})

// delete
products.delete('/;id', (req, res) => {
  Comics.findByIdAndRemove(req.params.id, (err, deletedComic) => {
    res.redirect('/products')
  })
})

module.exports = products
