'use strict';

// Servers use 'require' instead of 'import'

// Express server
//bring in express
const express = require('express');
const app = express();

// CORS allows frontend to access backend data
const cors = require('cors');
app.use(cors());

// dotenv to access .env file - Do BEFORE defining PORT
require('dotenv').config();
const PORT = process.env.PORT;

// <---------------------------->

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  };
};

let weatherData = require('./data/weather.json');


//listening for the weather route
app.get('/weather', (request, response) => {
  let lat = request.query.lat
  let lon = request.query.lon
  let searchQuery = request.query.searchQuery

//note: only use lat lon for api call
  // note: put axios.get call for weather.find
const findCity = weatherData.find(weather => searchQuery.toLowerCase() === weather.city_name.toLowerCase());

console.log(findCity.data[0].description);
// note: findcity.data.data.map?
response.send(findCity.data.map(current => new Forecast(current.datetime, current.weather.description)));
});



// gives the routes server should listen for
app.get('/', (request, response) => {
  response.send('Hello from the server!')
});


//tells server to listen for requests
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

//error handling, goes on the VERY BOTTOM/the last route
app.get('/*', (request, response) => {
  response.status(500).send('SOMETHING DONE GOOFED');
})