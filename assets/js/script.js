var weatherButton = $('#get-weather');
var apiKey = 'c33974f6b55837669ae9af7f2fe6758a';
var cityLat;
var cityLon;


function callGeo() {
  console.log('GeoFind Called')
  var searchedCity = $('#city-search').val();
  var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchedCity + '&appid=' + apiKey;

  fetch(geoUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      console.log(response[0].lat);
      console.log(response[0].lon);
      cityLat = response[0].lat;
      cityLon = response[0].lon;
      callWeather();
      callForecast();
    })

}

function callWeather() {
  console.log('Weather Called');
  console.log(cityLat);
  console.log(cityLon);
  var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + cityLat + '&lon=' + cityLon + '&appid=' + apiKey;

  fetch(weatherUrl)
    .then(function (response) {
      console.log('Weather Fetched');
      return response.json();
    })
    .then(function (response) {
      console.log(response);
    })
}

function callForecast() {
  console.log('Forecast Called')
  var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&appid=' + apiKey;

  fetch(forecastUrl)
    .then(function (response) {
      console.log('Forecast Fetched');
      return response.json();
    })
    .then(function (response) {
      console.log(response);
    })
}


weatherButton.on('click', callGeo);

