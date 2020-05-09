const express = require('express');
const mongoose = require('mongoose');

const port = process.env.PORT || 9000;

const app = express();

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/roomies',
  { useNewUrlParser: true, useUnifiedTopology: true }
)

mongoose.set('useFindAndModify', false);

app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.post('/', function(req, res, next) {
  
})

app.listen(port, () => console.log(`Listening on port ${port}`));