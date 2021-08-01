'use strict';

// Servers use 'require' instead of 'import'

const express = require('express');
const app = express();

// gives the routes server should listen for
app.get('/', (request, response) => {
  response.send('Hello from the server!')
});

//tells server to listen for requests
app.listen(3001, () => console.log('listening on port 3001'));