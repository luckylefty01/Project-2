const express = require('express')
const Comics = require('../models/comics')

const store = express.Router()

//====Routes====
//index
store.get('/',(req, res) => {
  Comics.find({}, (err, foundComics) => {
    res.render('store/index.ejs', {
      comics: foundComics
    })
  })
})

//new
store.get('/new', (req, res) => {
  res.render('store/new.ejs')
})

//show
store.get('/:id', (req, res) => {
  Comics.findById(req.params.id, (err, foundComic) => {
    res.render('store/show.ejs', {
      comic: foundComic
    })
  })
})

//edit
store.get('/:id/edit', (req, res) => {
  Comics.findById(req.params.id, (err, foundComic) => {
    res.render('store/edit.ejs',{
      comic: foundComic
    })
  })
})

// create
store.post('/', (req, res) => {
  Comics.create(req.body, (err, createdComic) => {
    res.redirect(`/store`)
  })
})

// update
store.put('/:id', (req, res) => {
  Comics.findByIdAndUpdate(
    req.params.id,
    req.body, {new: true}, (err, updatedComic) => {
      res.redirect(`/store/${req.params.id}`)
    }
  )
})

//buy
store.put('/:id/buy', (req, res) => {
  Comics.findByIdAndUpdate(
    req.params.id,
    { $inc: { qty: -1 } },
    { new: true },
    (err, updatedComic) => {
      res.redirect(`/store/${req.params.id}`)
    }
  )
})

// delete
store.delete('/:id', (req, res) => {
  Comics.findByIdAndRemove(req.params.id, (err, deletedComic) => {
    res.redirect('/store')
  })
})

module.exports = store
