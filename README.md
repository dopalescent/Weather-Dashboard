# <Challenge 6: Weather Dashboard>

## Description

- In this project, we were tasked with building a weather dashboard that would run in the browser and feature dynamically updated HTML and CSS.
- One component of this project required us to fetch, parse, and properly utilize data from a server-side API to get current weather data from a target city.
- The project's webpage had to be designed to accommodate the display of varying information. The data returned from our API call had to be fed to the correct parts of the weather display such that each search would show the corresponding results. These searches themselves had to be displayed such that they were both accessible for recall and consistent with the current search history, and even had to account for duplicate entries.
- This project appeared deceptively simple and, while the components are simple and few in number, the code they needed involved many interdependent moving parts. Completing this project to meet this high standard truly feels like an accomplishment.

## Usage

- To use the weather dashboard, first navigate to the webpage. At time of publication, the project can be found deployed at https://dopalescent.github.io/Weather-Dashboard/
- Once there, you should see an input bar with placeholder text reading "City Name" with a button directly below it reading "Get Weather". Aside from these two things and the banner above, the page should otherwise be empty.
- Type the name of a United States city into the input bar. Choosing major US cities or cities with unique names will yield more consistent results. At this stage of development no mechanisms for catching typos have been implemented, so correct spelling is required. (Note: attempting to click the "Get Weather" button with an empty input bar will not yield any changes.)
- Once you have typed in a city name, a blue card should appear below the "Get Weather" button with the name of the searched city. To the right will be a large card listing the searched city's name, the current date, and an icon representing current weather conditions, with information for temperature, wind, and humidity. The "5-Day Forecast" section below will have smaller cards for the 5 days following the current date, each with the same weather information as above for the given date.
- Each additional city name searched will be added to the top of a list of cards below the "Get Weather" button witout duplicates. The card whose city is currently being displayed will be blue, and any others will be white. Clicking on any of these cards will call up the weather display for the corresponding city. This list of search history cards is saved to local storage each time a city's weather information is called. Reloading the page will reset the display to its original state, with the addition of a list of search history cards retrieved from local storage, and the weather display will not reappear until a city's information is called again.


- The following screenshot previews the deployed project:

![screenshot](./assets/images/weather_dashboard_screenshot.png)

## Credits

- Penn LPS Boot Camp program for education and resources
- OpenWeather for their geocoding and weather data APIs
- Day.js for their date and time library
- EdX and The Full-Stack Blog for their 'Professional README Guide' article