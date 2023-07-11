var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');
var server = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
require("dotenv").config();
app.use(session({
  secret: 'secret-key', // Ganti dengan kunci rahasia yang aman
  resave: false,
  saveUninitialized: true
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname, 'views')))

app.use('/', server.home)
app.use('/', server.user)
app.use('/', server.ticket)
app.use('/', server.balance)
app.use('/', server.history)
app.use('/', server.profile)

module.exports = app;