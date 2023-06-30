const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Users = require('../models/users')


router.get('/', checkNotAuthenticated, (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.render('signup', { users: new Users() })
})

router.post('/', checkNotAuthenticated, async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const users = new Users({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: hashedPassword
    })
  try {
    const newUsers = await users.save()
    res.redirect('/login')
  } catch (err) {
    console.error(err);
    res.redirect('/signup')

  }
})




function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.originalUrl !== '/admin/login') {
    return res.redirect('/');
  }
  next();
}


module.exports = router