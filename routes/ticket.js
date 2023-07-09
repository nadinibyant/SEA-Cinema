var express = require('express');
var router = express.Router();
const controllers = require('../controllers')
const path = require('path')

router.get('/BuyTicket/:id_film', controllers.ticket.tampilBuyTicket)
router.get('/BuyTicket/detailFilm/:id_film', controllers.ticket.getFilmBuy)
router.post('/BuyTicket/:id/:ticketPrice', controllers.ticket.numberTicket)
router.get('/BuyTicket/seats/:id_transaction/:id', controllers.ticket.viewSeats)
router.post('/BuyTicket/seats/:id_transaction/:id', controllers.ticket.finalTicket)
router.get('/BuyTicket/cancel/:id_transaction', controllers.ticket.cancelFinal)
router.get('/BuyTicket/detail/:id_transaction', controllers.ticket.getDataDetail)
router.get('/BuyTicket/finish/:id_transaction', controllers.ticket.finishTransc)



module.exports = router