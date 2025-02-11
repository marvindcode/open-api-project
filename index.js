// Adding  event listeners 
document.getElementById('show-today').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();

    if (city === '') {
        alert('Please enter a city name!');
        return;
    }

    clearErrorMessage(); 
    fetchCityData(city, 'today'); 
});

document.getElementById('show-forecast').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();

    if (city === '') {
        alert('Please enter a city name!');
        return;
    }

    clearErrorMessage(); 
    fetchCityData(city, 'forecast'); 
});

// Function to fetch city coordinates with Nominatim API
function fetchCityData(city, type) {
    fetch(`https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&format=json`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const latitude = data[0].lat;
                const longitude = data[0].lon;

                if (type === 'today') {
                    fetchTodayWeather(latitude, longitude, city);
                } else if (type === 'forecast') {
                    fetchForecastWeather(latitude, longitude, city);
                }
            } else {
                showErrorMessage('City not found!');
            }
        })
        .catch(error => {
            console.error('Error fetching geolocation:', error);
            showErrorMessage('Unable to find city. Please try again.');
        });
}

// Fetch today's weather with Open-Meteo API
function fetchTodayWeather(latitude, longitude, cityName) {
    const currentWeatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;

    fetch(currentWeatherURL)
        .then(response => response.json())
        .then(data => {
            document.getElementById('weather-info').style.display = 'block';
            document.getElementById('forecast-info').style.display = 'none';
            displayToday(data.current_weather, cityName);
        })
        .catch(error => {
            console.error('Error fetching current weather:', error);
            showErrorMessage('Unable to fetch current weather.');
        });
}

// Fetch 5-day forecast with Open-Meteo API
function fetchForecastWeather(latitude, longitude, cityName) {
    const forecastURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

    fetch(forecastURL)
        .then(response => response.json())
        .then(data => {
            document.getElementById('forecast-info').style.display = 'block';
            document.getElementById('weather-info').style.display = 'none';
            displayForecast(data.daily, cityName);
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
            showErrorMessage('Unable to fetch forecast.');
        });
}

// Display of Today's Weather
function displayToday(weather, cityName) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <h2>Today's Weather in ${cityName}</h2>
        <p>Temperature: ${weather.temperature}°C</p>
        <p>Windspeed: ${weather.windspeed} km/h</p>
    `;
}

// Display of 5-Day Forecast
function displayForecast(forecast, cityName) {
    const forecastContent = document.getElementById('forecast-content');
    forecastContent.innerHTML = '';

    if (forecast && forecast.time && forecast.temperature_2m_max && forecast.temperature_2m_min) {
        for (let i = 0; i < 5; i++) {
            forecastContent.innerHTML += `
                <div class="forecast-day">
                    <p class="forecast-date"><strong>Date:</strong> ${forecast.time[i]}</p>
                    <p><strong>Max Temp:</strong> ${forecast.temperature_2m_max[i]}°C</p>
                    <p><strong>Min Temp:</strong> ${forecast.temperature_2m_min[i]}°C</p>
                </div>
            `;
        }
    } else {
        showErrorMessage('Unable to fetch proper forecast data.');
    }
}

// Show error message
function showErrorMessage(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'block';
    errorMessage.textContent = message;

    document.getElementById('weather-info').style.display = 'none';
    document.getElementById('forecast-info').style.display = 'none';
}

// Clear error message
function clearErrorMessage() {
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';
}

document.getElementById('show-today').click();
