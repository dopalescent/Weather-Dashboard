var weatherButton = $('#get-weather');
var searchHistory = $('#search-history');
var apiKey = 'c33974f6b55837669ae9af7f2fe6758a';
var enteredCity;
var searchedCity;
var cityLat;
var cityLon;
var searches = [];


function callGeo(searchedCity) {
  enteredCity = $('#city-search').val();

  if (enteredCity) {
    searchedCity = enteredCity;
  }

  printSearches();

  var geoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchedCity + '&limit=1&appid=' + apiKey;

  fetch(geoUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {

      cityLat = response[0].lat;
      cityLon = response[0].lon;

      callWeather();
      callForecast();

      $('#city-search').val('');
    })

}

function callWeather() {

  var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + cityLat + '&lon=' + cityLon + '&appid=' + apiKey + '&units=imperial';

  fetch(weatherUrl)
    .then(function (response) {

      return response.json();
    })
    .then(function (response) {

      var weatherTitle = $('#weather-title');
      var cityTitle = response.name;
      var thisDay = dayjs().format('(MM/DD/YYYY)');
      weatherTitle.text(cityTitle + '  ' + thisDay);

      var weatherIcon = response.weather[0].icon;
      var weatherImg = $('#weather-img');
      weatherImg.attr('src','https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png');

      var weatherTemp = $('#weather-temp');
      weatherTemp.text('Temp: ' + response.main.temp + '°F');

      var weatherWind = $('#weather-wind');
      weatherWind.text('Wind: ' + response.wind.speed + ' MPH');

      var weatherHumidity = $('#weather-humidity');
      weatherHumidity.text('Humidity: ' + response.main.humidity + '%');
    })
}

function callForecast() {

  var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&appid=' + apiKey + '&units=imperial';

  fetch(forecastUrl)
    .then(function (response) {

      return response.json();
    })
    .then(function (response) {

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

function printSearches() {

  manageStorage();
 
  if (searchHistory.children.length > 0) {
    searchHistory.empty();
  }

  for(var k = 0; k < searches.length; k++) {
    var searchCard = $(`<li id="li-${k}" class="my-1 list-group-item list-group-item-action">${searches[k]}</li>`);

    if (searchedCity === searches[k]) {
      searchCard.addClass('active');
    }

    searchCard.on('click', function(event) {
      searchedCity = $(event.target).text();
      callGeo(searchedCity);
    })

    searchHistory.append(searchCard);
  }

}

function manageStorage() {

  enteredCity = $('#city-search').val();

  var storedSearches = JSON.parse(localStorage.getItem('searches'));

  if (storedSearches !== null) {

    searches = storedSearches;
    for(var j = (searches.length - 1); j >= 0; j--) {
      if (enteredCity === searches[j]){
        searches.splice(j, 1);
      }
    }
  } else {
    searches = [];
  }

  if (enteredCity !== null && enteredCity !== '') {

    searches.unshift(enteredCity);
  }
  
  if (searches.length > 10) {
    searches.pop();
  }

  localStorage.setItem('searches', JSON.stringify(searches));

  return searches;
}

printSearches();

weatherButton.on('click', callGeo);
