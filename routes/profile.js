const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

router.get('/profile', controllers.profile.viewProfile)
router.get('/dataProfile', controllers.profile.getDataProfile)
router.get('/profile/editProfile', controllers.profile.viewEdit)
router.post('/profile/editProfile', controllers.profile.editProfile)
router.post('/logout', controllers.profile.logout)

module.exports = router