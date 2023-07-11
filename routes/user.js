var express = require('express');
var router = express.Router();
const controllers = require('../controllers')
const path = require('path')

router.get('/signin', (req,res) => {
    res.render('signin');
})
router.get('/signup', (req,res) => {
    res.render('signup');
})
router.post('/signup', controllers.user.signup)
router.post('/signin', controllers.user.signin)

module.exports = router