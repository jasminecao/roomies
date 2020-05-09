const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user.js');

const port = process.env.PORT || 9000;

const app = express();
app.use(express.urlencoded())

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/roomies',
  { useNewUrlParser: true, useUnifiedTopology: true }
)

mongoose.set('useFindAndModify', false);

app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/', function(req, res, next) {
  res.status(200).send('hiya api working')
})

app.post('/signup', function(req, res, next) {
  console.log(req.body)
  var name = req.body.name
  var username = req.body.username
  var password = req.body.password

  var u = new User({
      name: name,
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

app.listen(port, () => console.log(`Listening on port ${port}`));