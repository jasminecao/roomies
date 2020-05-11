var express = require('express');
var mongoose = require('mongoose');
var User = require('./models/user.js');
var Group = require('./models/group.js');
var bodyParser = require('body-parser');
var path = require("path")
var cookieSession = require('cookie-session');

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

app.use('/', express.static(path.join(__dirname, '/client/build')));

// app.get('/', function(req, res, next) {
//   res.status(200).send('api working');
// })

//sends user currently logged in
app.get('/homeapi', function(req, res, next) {
  res.send(req.session);
})

//sends group's grocery list (if it exists)
app.get('/grocery', function(req, res, next) {
  var groupName = req.session.user.group
  var checkGroup = Group.findOne({name: groupName}, function(err, result) {
    if (err) {
      next(err)
    }
    if (result) {
      if (result.groceryList === undefined) {
        res.send([])
      } else {
        res.send(result.groceryList)
      }
    }
  })
})

//sends group's prev chore list and username list
app.get('/chore', function(req, res, next) {
  var groupName = req.session.user.group
  var checkGroup = Group.findOne({name: groupName}, function(err, result) {
    if (err) {
      next(err)
    }
    if (result) {
      if (result.choreList === undefined) {
        const usernameArray = [];
        for (let i = 0; i < result.users.length; i++) {
          usernameArray.push(result.users[i].name) //sends array with only names
        }
        res.send({groupMembers: usernameArray})
      } else {
        const usernameArray = [];
        for (let i = 0; i < result.users.length; i++) {
          usernameArray.push(result.users[i].name)
        }
        res.send({choreList: result.choreList, groupMembers: usernameArray})
      }
    }
  })
})

//sends group's message list
app.get('/message', function(req, res, next) {
  var groupName = req.session.user.group
  var checkGroup = Group.findOne({name: groupName}, function(err, result) {
    if (err) {
      next(err)
    }
    if (result) {
      if (result.messageList === undefined) {
        res.send([])
      } else {
        res.send(result.messageList)
      }
    }
  })
})

//saves user to db
app.post('/signup', function(req, res, next) {
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
    }
  })

  res.redirect('/login')
})

//saves user session
app.post('/login', function(req, res, next) {
  var username = req.body.username
  var password = req.body.password

  var u = new User({
      username: username,
      password: password,
  })
  var name = User.findOne({username: username, password: password}, function(err, result) {
    if (err) {
      next(err)
    }
    if (result) {
      req.session.user = result
      res.redirect('/home')
    } else {
      res.send('invalid username/password');
    }
  })
})

//saves new grocery list
app.post('/grocery', function(req, res, next) {
  req.setTimeout(250000, function() {
    res.send(408);
  });
  var groupName =  req.body.groupName; 
  var groceryList = req.body.groceryList;

  var findGroup = Group.findOneAndUpdate({name: groupName}, {$set: {groceryList: groceryList}}, function (err, resp) {
    if (err) {
      next(err)
    }
  });
  res.status(200).end()
})

//saves new chore list
app.post('/chore', function(req, res, next) {
  req.setTimeout(250000, function() {
    res.send(408);
  });
  var groupName =  req.body.groupName; 
  var choreList = req.body.choreList;

  var findGroup = Group.findOneAndUpdate({name: groupName}, {$set: {choreList: choreList}}, function (err, resp) {
    if (err) {
      next(err)
    }
  });
  res.status(200).end()
})

//saves new message list
app.post('/message', function(req, res, next) {
  req.setTimeout(250000, function() {
    res.send(408);
  });
  var groupName =  req.body.groupName; 
  var messageList = req.body.messageList;

  var findGroup = Group.findOneAndUpdate({name: groupName}, {$set: {messageList: messageList}}, function (err, resp) {
    if (err) {
      next(err)
    }
  });
  res.status(200).end()
})

app.get('/logoutapi', function(req, res) {
  req.session = null;
  console.log('end session ' + req.session)
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));