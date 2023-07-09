var express = require('express');
var router = express.Router();
const controllers = require('../controllers')

router.get('/history', controllers.history.viewHistory)
router.get('/allHistory', controllers.history.allTransc)
router.get('/history/:id_transaction', controllers.history.cancelTransc)

module.exports =router