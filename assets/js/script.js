var weatherButton = $('#get-weather');
var apiKey = 'c33974f6b55837669ae9af7f2fe6758a';
var cityLat;
var cityLon;

console.log(dayjs().format('(MM/DD/YYYY)'))
console.log(dayjs().add(1,'day').format('(MM/DD/YYYY)'))


function callGeo() {
  console.log('GeoFind Called')
  var searchedCity = $('#city-search').val();
  var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchedCity + '&limit=1&appid=' + apiKey;

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
  var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + cityLat + '&lon=' + cityLon + '&appid=' + apiKey + '&units=imperial';

  fetch(weatherUrl)
    .then(function (response) {
      console.log('Weather Fetched');
      return response.json();
    })
    .then(function (response) {
      console.log(response);

      var weatherTitle = $('#weather-title');
      var cityTitle = response.name;
      var thisDay = dayjs().format('(MM/DD/YYYY)');
      weatherTitle.text(cityTitle + '  ' + thisDay);

      var weatherIcon = response.weather[0].icon;
      var weatherImg = $('#weather-img')
      weatherImg.attr('src','https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png')

      var weatherTemp = $('#weather-temp');
      weatherTemp.text('Temp: ' + response.main.temp + '°F');

      var weatherWind = $('#weather-wind');
      weatherWind.text('Wind: ' + response.wind.speed + ' MPH');

      var weatherHumidity = $('#weather-humidity');
      weatherHumidity.text('Humidity: ' + response.main.humidity + '%');
    })
}

function callForecast() {
  console.log('Forecast Called')
  var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&appid=' + apiKey + '&units=imperial';

  fetch(forecastUrl)
    .then(function (response) {
      console.log('Forecast Fetched');
      return response.json();
    })
    .then(function (response) {
      console.log(response);

      for (var i = 0; i < 5; i++) {
        var forecastDate = $('#forecast-date-' + i);
        forecastDate.text(dayjs().add(i + 1,'day').format('(MM/DD/YYYY)'));

        var forecastIcon = response.list[i * 8].weather[0].icon;
        var forecastImg = $('#forecast-img-' + i);
        forecastImg.attr('src','https://openweathermap.org/img/wn/' + forecastIcon + '@2x.png');

        var forecastTemp = $('#forecast-temp-' + i);
        forecastTemp.text('Temp: ' + response.list[i * 8].main.temp + '°F');

        var forecastWind = $('#forecast-wind-' + i);
        forecastWind.text('Wind: ' + response.list[i * 8].wind.speed + ' MPH');
  
        var forecastHumidity = $('#forecast-humidity-' + i);
        forecastHumidity.text('Humidity: ' + response.list[i * 8].main.humidity + '%');
      }
    })
}


weatherButton.on('click', callGeo);

