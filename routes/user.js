var express = require('express');
var router = express.Router();
const controllers = require('../controllers')
const path = require('path')

router.get('/signin', (req,res) => {
    const signinPath = path.join(__dirname, '../views/signin.html');
    res.sendFile(signinPath)
})
router.get('/signup', (req,res) => {
    const signupPath = path.join(__dirname, '../views/signup.html');
    res.sendFile(signupPath)
})
router.post('/signup', controllers.user.signup)
router.post('/signin', controllers.user.signin)

module.exports = router