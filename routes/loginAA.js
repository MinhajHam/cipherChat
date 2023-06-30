const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

// Import the necessary modules for user lookup or integration with a database
const { findUserByUsername, findUserById } = require('../user-repository');

// Initialize Passport.js configuration
const initializeAdminPassport = require('../passport-config-admin');
initializeAdminPassport(passport, findUserByUsername, findUserById);

/* GET login page. */
router.get('/', checkNotAuthenticated, (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.render('loginAA.ejs');
});


/* POST login form submission. */
router.post('/', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/admin/index',
  failureRedirect: '/loginAA',
  failureFlash: true
}));


function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}



module.exports = router;