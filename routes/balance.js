const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

router.get('/balance', controllers.balance.tampilBalance)
router.get('/getBalance', controllers.balance.getDataSaldo)
router.post('/addBalance', controllers.balance.addBalance)


module.exports = router