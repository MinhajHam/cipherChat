const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')


router.get('/', checkNotAuthenticated, (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.render('signupAA', { user: new User() })
})

router.post('/', checkNotAuthenticated, async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    })
  try {
    const newUser = await user.save()
    res.redirect('/login')
  } catch (err) {
    console.error(err);
    res.redirect('/signupAA')

  }
})




function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

module.exports = router