var express = require('express');
var router = express.Router();
const controllers = require('../controllers')
const path = require('path')

router.get('/', (req, res) => {
    res.render('index');
})
router.get('/home', controllers.home.tampilHome)
router.get('/username', controllers.home.getUsername)
router.get('/allfilm', controllers.home.allfilm)

module.exports = router