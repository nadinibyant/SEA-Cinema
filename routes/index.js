const home = require('./home')
const user = require('./user')
const ticket = require('./ticket')
const balance = require('./balance')
const history = require('./history')
const profile = require('./profile')

const server = {}

server.home = home
server.user = user
server.ticket = ticket
server.balance = balance
server.history = history
server.profile = profile


module.exports = server