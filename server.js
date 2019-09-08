
const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.disable('x-powered-by');
const request = require('request');

// check requests
// const morgan = require('morgan');
// app.use(morgan('combined'));

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/dpr-aware-image', (req, res) => {
  const dpr = req.headers.dpr;
  const url = `https://via.placeholder.com/${dpr * 400}/92c952`
  const requestSettings = {
    url,
    method: 'GET',
    encoding: null
  };

  request(requestSettings, (error, response, body) => {
    res.set('Content-Type', 'image');
    res.send(body);
  });
});

app.use(express.static(path.join(__dirname, 'build')));

// need to declare a "catch all" route on your express server 
// that captures all page requests and directs them to the client
// the react-router do the route part
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(
  process.env.PORT || 5000,
  () => {
    console.log(`Frontend start on http://localhost:5000`);
  }
);
