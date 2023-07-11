var express = require('express');
var router = express.Router();
const controllers = require('../controllers')

router.get('/', (req, res) => {
    res.sendFile('index.html')
})
router.get('/home', controllers.home.tampilHome)
router.get('/username', controllers.home.getUsername)
router.get('/allfilm', controllers.home.allfilm)

module.exports = router