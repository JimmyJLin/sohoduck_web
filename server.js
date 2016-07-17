const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const firebase = require('firebase');

/* app setting */
const port = process.env.PORT || 3000;
const app = express();
const server = app.listen(port);
const request = require('request');

// sass setting
const sassMiddleware = require('node-sass-middleware');
const srcPath = __dirname + '/sass';
const destPath = path.join(__dirname + '/public/css');

// sassMiddleware
app.use(sassMiddleware({
  src: srcPath,
  dest: destPath,
  debug: true,
  outputStyle: 'compressed',
  prefix: '/prefix'
}));

// parse incoming forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// static route to public
app.use(express.static(path.join(__dirname, 'public')));

// log
app.use(logger('dev'));

/*Views*/
app.set('views', './views');
app.set('view engine', 'ejs');


// Home
app.get('/', function(req, res){
  res.render('pages/index')
})

// Directions
app.get('/directions', function(req, res){
  res.render('pages/directions')
})

// Restaurants/Bars
app.get('/restaurants', function(req, res){
  res.render('pages/restaurants')
})

// Shopping
app.get('/shoppings', function(req, res){
  res.render('pages/shoppings')
})

// POIs
app.get('/pois', function(req, res){
  res.render('pages/pois')
})

// Dashboard
app.get('/newdashboard', function(req, res){
  res.render('pages/newDashboard')
})

app.get('/dashboard', function(req, res){
  res.render('pages/dashboard')

  // firebase.auth().onAuthStateChanged(function(user){
  //   if (user) {
  //     res.render('pages/dashboard')
  //   } else {
  //     res.render('pages/index')
  //   }
  //
  // })


})
