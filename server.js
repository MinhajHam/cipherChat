if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const mongoose = require('mongoose');
const methodOverride = require('method-override')


const homeRoutes = require('./routes/home');
const indexRoutes = require('./routes/index');
const loginRoutes = require('./routes/login');
const signupRoutes = require('./routes/signup');
const loginAARoutes = require('./routes/loginAA');


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', err => console.error(err))
db.once('open', () => console.log('connected to mongoose'))

// Use the routes
app.use('/', indexRoutes);
app.use('/home', homeRoutes);
app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/loginAA', loginAARoutes);


app.listen(process.env.PORT ||7000, () => console.log("server connected to 7000"))
