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

Class Forecast {
  constructor(date, description); {
    this.date = date,
    this.description = description,
  }
};

let weatherData = require('./data/weather.json');


app.get('/weather', (request, response) => {
  let lat = request.query.lat
  let lon = request.query.lon
  let searchQuery = requst.query.searchQuery
  response.send(weatherData.filter(weather => ));
});




// gives the routes server should listen for
app.get('/', (request, response) => {
  response.send('Hello from the server!')
});

//tells server to listen for requests
app.listen(PORT, () => console.log(`listening on port ${PORT}`));


//
//error handling, goes on the VERY BOTTOM/the last route
app.get('/*', (request, response) => {
  response.status(500).send('SOMETHING DONE GOOFED');
})


// next steps are 1. requiring (like import) the weather.json data 
//x2. building an app.get('/weather', (req, res) => {}) route 
//x3. defining your variables for capturing the req.query parameters of lat, lon, and searchRequest 
//4. filtering over the weatherData to find the city_name that equals your searchQuery 
//5. taking that city object and finding the data array inside of it that contains the 3 day forecast 
//x6. making a class for Forecast that takes in 2 arguments (date, description) 
//7. using that class and as you map over the city-object-forecast-array instantiates new Forecast objects/instances and push them into the resultsArray and send that as a response 
//8. or if that failed to send back an error message sounds like a lot but it is only a couple of lines of code and once Ryan goes over it in class tonight it will all become much clearer
// 07/31 class video