var weatherButton = $('#get-weather');
var apiKey = 'c33974f6b55837669ae9af7f2fe6758a';

function callWeather () {
  console.log('Weather Called')
  var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=' + apiKey;
  // var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=c33974f6b55837669ae9af7f2fe6758a';
  requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=London&appid=' + apiKey;

  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      console.log(response[0]);
      console.log(response[0].lat);
      console.log(response[0].lon);
      var collection = response;
      console.log(collection);
      console.log(collection[0]);
      console.log(collection[0].lat);
      console.log(collection[0].lon);      
    })
    .then(function (data) {
      console.log(data);
    })
}




weatherButton.on('click', callWeather)

