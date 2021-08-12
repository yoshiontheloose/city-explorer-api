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

const axios = require('axios');
const { response } = require('express');

// <---------------------------->

class Forecast {
  constructor(weatherData) {
    console.log(weatherData.weather);
    this.date = weatherData.datetime;
    this.description = weatherData.weather.description;
  };
};

//listening for the weather route
app.get('/weather', async (request, response) => {
  let lat = request.query.lat
  let lon = request.query.lon
  let searchQuery = request.query.searchQuery

let findCity = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`);

//findcity.data gets data from api, .data is the name of the data array in api data.
//then .map runs over the current data to make a new Forecast data object
response.send(findCity.data.data.map(current => new Forecast(current)));
});

class Movie {
  constructor(movie) {
    // displays movie image, empty string if there is not a movie image
    this.src = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '';
    this.title = movie.title
  }
}



//Movie route
app.get('/movies', async (request, response) => {
  let query = request.query.query
  let results = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`);
  
  // results.data.results: the movie results we named above, the data from the api, the array of data IN api data is named 'results' 
  //maps over movie (from constructor) to make our new Movie object from class created above
  response.send(results.data.results.map(movie => new Movie(movie)));

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