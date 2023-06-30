const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('admin/index')
})

router.get('/userlog', (req, res) => {
    res.render('admin/userlog')
  })
  

module.exports = router