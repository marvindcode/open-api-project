## open-api-project

# My open API Project: Weather Finder App

## Description
The purpose of this Project is to find the weather from any city in the world.  This aplication will allow users to not just find the current weather, also view a 5-day weather forecast for the fity.

The information for this project is retrieved from the Open-Meteo API which provides the weather information based on the coordinates of a city.  In order to look for a city by name was necessary to use the Nominatim API wich converts the city name to the coordinates of longitude and latitude.

## Features
* Search for a city and display:
  * Current temperature and windspeed.
  * A 5-day weather forecast with minimun and maximum temperature for the day.
* Dynamic error messages for invalid or missing city data.
* Dates in the forecast are styled in a different color for easy identification.

## Resources
* HTML: For the structure of the webpage.
* CSS: For styling the app, including responsive design.
* JavaScript: For functionality, including API calls and DOM manipulation.
* Open-Meteo API: To fetch weather data.
* Nominatim API: For converting city names to geographic coordinates.

## Instructions
To access to the application you have to do the following:
1. You need VS Code or other code editor.
2. A browser.
3. you will have to open the .HTML file in the browser to access the file.
4. Enter the name of a city in the input field.
5. Click the "Today" button to view the current weather for the city.
6. Click the "Forecast" button to view a 5-day weather forecast for the city.
7. If the city is invalid or not found, an error message will be displayed.
8. You can switch between the "Today" and "Forecast" options.




