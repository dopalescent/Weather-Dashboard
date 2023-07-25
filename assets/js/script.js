// Universal Vars
var weatherButton = $('#get-weather');
var searchHistory = $('#search-history');
var apiKey = 'c33974f6b55837669ae9af7f2fe6758a';
var enteredCity;
var searchedCity;
var cityLat;
var cityLon;
var searches = [];

// Initiated on "Get Weather" click, converts city to coordinates and calls other functions
function callGeo(searchedCity) {
  // Input made accessible
  enteredCity = $('#city-search').val();
  // Checks if target city submitted from input field
  if (enteredCity) {
    searchedCity = enteredCity;
  }
  // Ceases entire process if no target city is established
  if(!searchedCity) {
    return;
  }
  // Reveals Content Display once the first search successfully begins
  var contentContainer = $('#content-container');
  if(contentContainer.hasClass('d-none')) {
    contentContainer.removeClass('d-none');
  }
  // Initiate printing of Search History cards
  printSearches(searchedCity);
  // URL for Geolocator
  var geoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchedCity + '&limit=1&appid=' + apiKey;
  // Fetch the coordinates for the target city
  fetch(geoUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      // Set coordinates to var values to reference in next steps
      cityLat = response[0].lat;
      cityLon = response[0].lon;
      // Initiate the next steps
      callWeather();
      callForecast();
      // Ensure the search input field is cleared
      $('#city-search').val('');
    })
}

// Fetches weather data and posts it to the Weather Display card
function callWeather() {
  // URL for weather API
  var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + cityLat + '&lon=' + cityLon + '&appid=' + apiKey + '&units=imperial';
  // Fetch weather data
  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      // Post weather data to Weather Display card
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

// Fetches forecast data and posts it to the Forecast Display card
function callForecast() {
  // URL for forecast API
  var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&appid=' + apiKey + '&units=imperial';
  // Fetch forecast data
  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      // Post forecast data to each Forecast Display card
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

// Prints Search History cards below search form
function printSearches(searchedCity) {
  // Initiates local storage check and Search History changes
  manageStorage();
  // Clears Search History cards from previous search
  if (searchHistory.children.length > 0) {
    searchHistory.empty();
  }
  // Creates a card for each Search History entry
  for(var k = 0; k < searches.length; k++) {
    var searchCard = $(`<li id="li-${k}" class="my-1 list-group-item list-group-item-action">${searches[k]}</li>`);
    // Marks card featuring current target city
    if (searchedCity === searches[k]) {
      searchCard.addClass('active');
    }
    // Adds event listener to each card, clicking will initiate a search for that target city
    searchCard.on('click', function(event) {
      searchedCity = $(event.target).text();
      callGeo(searchedCity);
    })
    // Appends Search History cards to the intended parent
    searchHistory.append(searchCard);
  }
}

// Updates Search History and retrieves from/ saves to local storage
function manageStorage() {
  // Input made accessible
  enteredCity = $('#city-search').val();
  // Attempts to retrieve Search History from local storage
  var storedSearches = JSON.parse(localStorage.getItem('searches'));
  // Checks if search history found
  if (storedSearches !== null) {
    // Integrates Search History retrieved from local storage
    searches = storedSearches;
    // Removes current target city from Search History
    for(var j = (searches.length - 1); j >= 0; j--) {
      if (enteredCity === searches[j]){
        searches.splice(j, 1);
      }
    }
    // Sets default value if no search history found
  } else {
    searches = [];
  }
  // Adds value entered in search input field to search history
  if (enteredCity !== null && enteredCity !== '') {
    searches.unshift(enteredCity);
  }
  // Limits search history to 10 most recent entries
  if (searches.length > 10) {
    searches.pop();
  }
  // Saves updated search history to local storage
  localStorage.setItem('searches', JSON.stringify(searches));
  // Returns search history for print function to access
  return searches;
}

// Prints any Search History cards on page load
printSearches();

// Listens for click on "Get Weather" button
weatherButton.on('click', function(event) {
  event.preventDefault();
  callGeo();
});
