var compression = require('compression');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/jsshop');

var app = express();

app.use(compression());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'storage')));
app.use(require('./config/assets'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({
  limit: '1mb'
}));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(require('./lib'));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  next(err);
});

// error handlers
// my error handler
app.use(function (err, req, res, next) {
  if (err.code == 11000) {
    err.status = 409;
  } else if (err.name == 'ValidationError') {
    err.status = 400;
  }
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;

