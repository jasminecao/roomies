const express = require('express');
const app = express();
const port = process.env.PORT || 9000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  console.log('express backend')
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
  console.log('express backend done')
});