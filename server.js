var express = require('express');
var mongoose = require('mongoose');
var User = require('./models/user.js');
var Group = require('./models/group.js');
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
  console.log('get home user ' + req.session.user)
  res.send(req.session);
})

app.get('/grocery', function(req, res, next) {
  var groupName = req.session.user.group
  console.log("in get: " + groupName)
  var checkGroup = Group.findOne({name: groupName}, function(err, result) {
    if (err) {
      next(err)
    }
    if (result) {
      if (result.groceryList === undefined) {
        console.log("no list")
        res.send([])
      } else {
        console.log("good list")
        console.log(result.groceryList)
        res.send(result.groceryList)
      }
    }
  })
})

app.get('/chore', function(req, res, next) {
  var groupName = req.session.user.group
  var checkGroup = Group.findOne({name: groupName}, function(err, result) {
    if (err) {
      next(err)
    }
    if (result) {
      if (result.choreList === undefined) {
        res.send({groupMembers: result.users})
      } else {
        console.log("good list")
        console.log(result.choreList)
        res.send({choreList: result.choreList, groupMembers: result.users})
      }
    }
  })
})

app.post('/signup', function(req, res, next) {
  console.log(req.body)
  var name = req.body.name
  var groupName = req.body.group
  var username = req.body.username
  var password = req.body.password

  var u = new User({
      name: name,
      group: groupName,
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

  var checkGroup = Group.findOne({name: groupName}, function(err, result) {
    if (err) {
      next(err)
    }
    if (!result) {
      var g = new Group({
        name: groupName,
        users: [u],
      })
      g.save(function(err) {
        if (err) {
          next(err)
        }
      })
    } else {
      Group.findOneAndUpdate({name: groupName}, {$push: {users: u}}, function (err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
      });
      // db.groupschema.update(
      //   {name: groupName},
      //   {$push: {users: u}}
      // )
    }
  })

  res.redirect('/login')
})

app.post('/login', function(req, res, next) {
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
      req.session.user = result
      console.log('logged in ' + req.session.user)
      res.redirect('/home')
    } else {
      res.send('invalid username/password');
    }
  })
})

app.post('/grocery', function(req, res, next) {
  req.setTimeout(250000, function() {
    console.log('request timeout');
    res.send(408);
  });
  var groupName =  req.body.groupName; 
  var groceryList = req.body.groceryList;
  console.log("grocery: groupname is " + groupName)
  console.log("grocery list is " + groceryList)

  var findGroup = Group.findOneAndUpdate({name: groupName}, {$set: {groceryList: groceryList}}, function (err, resp) {
    if (err) {
      console.log(err)
      next(err)
    } else {
      console.log(resp.groceryList);
    }
  });
  res.status(200).end()
})

app.get('/logout', function(req, res) {
  req.session = null;
  console.log('end session ' + req.session)
})

app.listen(port, () => console.log(`Listening on port ${port}`));