'use strict';

// Load Environment Variables from the .env file
require('dotenv').config();
const superagent = require('superagent');

// Application Dependencies
const express = require('express');

// middleware for express that the browsers hits the web server with an 'options' request BEFORE the 'get/put/post...' to see if that current domain is allowed to make that request. Only does this if it is on a differnt domain. By default, allow other domains to hit this API
const cors = require('cors');

// Application Setup
const PORT = process.env.PORT;
const app = express();
app.use(cors());

// API Routes
app.get('/', (request, response) => {
    let URL = `https://api.unsplash.com/photos/?client_id=${process.env.ACCESSKEY}`;

    superagent.get(URL)
    .then(data => {
      let myData = JSON.parse(data.res.text);
      let randomIndex = Math.floor(Math.random() * (10)) + 1;
      let imgSrc = myData[randomIndex].urls.small;
      response.send(imgSrc);
    })
    .catch ( error => handleError(error,response));
});

// helper functions

// errors
function handleError(error,response) {
  console.log('error',error);
  if(response){
    response.status(500).send('sorry there is no data')
  }
}


// Make sure the server is listening for requests
app.listen(PORT, () => console.log(`App is listening on ${PORT}`) );