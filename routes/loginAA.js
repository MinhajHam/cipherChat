const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

// Import the necessary modules for user lookup or integration with a database
const { findUserByUsername, findUserById } = require('../user-repository');

// Initialize Passport.js configuration
const initializePassport = require('../passport-config-admin');
initializePassport(passport, findUserByUsername, findUserById);

router.use(flash());
router.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());

/* GET login page. */
router.get('/', checkNotAuthenticated, (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.render('loginAA');
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