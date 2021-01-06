var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var methodOverride = require('method-override');

// Require Routes
var main = require('./routes/main');
var users = require('./routes/users');
var pets = require('./routes/pets');
var userPet = require('./routes/userPet');

var app = module.exports = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use Routes
app.use('/', main)
app.use('/users', users)
app.use('/pets', pets)
app.use('/userPet', userPet)

// define custom res.message()
// app.response.message = (msg) => {
//   console.log(this)
//   var sess = this.req.session;
//   sess.messages = sess.messages || [];
//   sess.messages.push(msg);
//   return this;
// }

// log
if (!module.parent) app.use(logger('dev'));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// session support
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'alibaba'
}));

// parse request bodies (req.body)
app.use(express.urlencoded({
  extended: true
}));

// allow overriding methods in query (?_method=put)
app.use(methodOverride('_method'));

app.use((req, res, next) => {
  var msgs = req.session.message || [];

  res.locals.messages = msgs;

  res.locals.hasMessages = !! msgs.length;

  next();

  req.session.messages = [];
});

// load controllers
// require('./lib/boot')(app, {
//   verbose: !module.parent
// });

app.use((err, req, res, next) => {
  if (!module.parent) console.log(err.stack);

  // error page
  res.status(500).render('5xx');
})

// assume 404
app.use((req, res, next) => {
  res.status(404).render('404', {
    url: req.originalUrl
  })
})

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}