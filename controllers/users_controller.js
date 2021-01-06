const bcrypt = require('bcrypt')
const express = require ('express')
const users = express.Router()
const User = require('../models/users.js')

users.get('/new', (req, res) => {
  res.render('users/new.ejs')
})

users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  // console.log(req.body);
User.create(req.body, (err, createdUser) => {
  console.log('the user was created: ', createdUser);
  res.redirect('/')
  })
})

module.exports = users
