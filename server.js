var express = require('express');
var mongoose = require('mongoose');
var User = require('./models/user.js');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var cors = require('cors')

var port = process.env.PORT || 9000;

var app = express();

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/roomies',
  { useNewUrlParser: true, useUnifiedTopology: true }
)

mongoose.set('useFindAndModify', false);

app.use(
  cookieSession({
    name: 'local-session',
    keys: ['spooky'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/', function(req, res, next) {
  res.status(200).send('hiya api working');
})

app.get('/home', function(req, res, next) {
  console.log(req.session)
  res.send(req.session);
})

app.post('/signup', function(req, res, next) {
  console.log(req.body)
  var name = req.body.name
  var group = req.body.group
  var username = req.body.username
  var password = req.body.password

  var u = new User({
      name: name,
      group: group,
      username: username,
      password: password,
  })

  var checkName = User.findOne({username: username}, function(err, result) {
      if (err) {
          next(err)
      }
      if (!result) {
          u.save(function(err) {
              if (err) {
                  next(err)
              }
          })
      }
  })
  res.redirect('/login')
})

app.post('/login', function(req, res, next) {
  console.log(req.body)
  var username = req.body.username
  var password = req.body.password

  var u = new User({
      username: username,
      password: password,
  })
  console.log('user is: ' + u)
  var name = User.findOne({username: username, password: password}, function(err, result) {
    if (err) {
      next(err)
    }
    if (result) {
      console.log('hello')
      req.session.user = result
      res.redirect('/home')
    } else {
      res.send('invalid username/password');
    }
  })
})

app.get('/logout', function(req, res) {
  req.session = null
  console.log(req.session)
})

app.listen(port, () => console.log(`Listening on port ${port}`));