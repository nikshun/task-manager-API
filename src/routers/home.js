const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')


router.get('', (req, res) => {
    res.render('home')
})

module.exports = router