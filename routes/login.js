const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const { getUserByEmail, getUserById } = require('../user-repository'); // Import the necessary modules for user lookup or integration with a database
const initializePassport = require('../passport-config');

initializePassport(passport, getUserByEmail, getUserById);

router.get('/', checkNotAuthenticated, (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.render('login.ejs');
});

router.post('/', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

module.exports = router;
