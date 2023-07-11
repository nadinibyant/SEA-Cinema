const user = require('./user')
const home = require('./home')
const ticket = require('./ticket')
const balance = require('./balance')
const history = require('./history')
const profile = require('./profile')
const controllers = {}

controllers.user = user
controllers.home = home
controllers.ticket = ticket
controllers.balance = balance
controllers.history = history
controllers.profile = profile

module.exports = controllers