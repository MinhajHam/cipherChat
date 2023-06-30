const express = require('express')
const router = express.Router()

router.get('/', checkAuthenticated, (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.render('index')
})



router.delete('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      
      console.error(err);
      return res.redirect('/'); 
    }
    res.redirect('/login');
  });
});



function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/home')
}


module.exports = router