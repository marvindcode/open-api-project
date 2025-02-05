document.getElementById('search-city-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();

    if (city === '') {
        alert('Please enter a city name!');
        return;
    }

    // using Nominatim API to fetch coordinates 
    fetch(`https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&format=json`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const latitude = data[0].lat;
                const longitude = data[0].lon;

                // Fetch current weather and forecast using Open-Meteo API
                fetchWeatherData(latitude, longitude, city);
            } else {
                throw new Error('City not found!');
            }
        })
        .catch(error => {
            console.error('Error fetching geolocation:', error);
            document.getElementById('weather-info').innerHTML = `<p>Unable to find city. Please try again.</p>`;
        });
});

// Fetch current weather and forecast using Open-Meteo
function fetchWeatherData(latitude, longitude, cityName) {
    const currentWeatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
    const forecastURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

    // Fetch current weather
    fetch(currentWeatherURL)
        .then(response => response.json())
        .then(data => displayToday(data.current_weather, cityName))
        .catch(error => console.error('Error fetching current weather:', error));

    // Fetch forecast
    fetch(forecastURL)
        .then(response => response.json())
        .then(data => displayForecast(data.daily, cityName))
        .catch(error => console.error('Error fetching forecast:', error));
}

// Display Today's weather
function displayToday(weather, cityName) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <h2>Today in ${cityName}</h2>
        <p>Temperature: ${weather.temperature}°C</p>
        <p>Windspeed: ${weather.windspeed} km/h</p>
    `;
}

// Display forecast  five days
function displayForecast(forecast, cityName) {
    const forecastInfo = document.getElementById('forecast-info');
    forecastInfo.innerHTML = `<h2>5-Day Forecast for ${cityName}</h2>`;

    for (let i = 0; i < 5; i++) {
        forecastInfo.innerHTML += `
            <div class="forecast-day">
                <p><strong>${forecast.time[i]}</strong></p>
                <p>Max Temp: ${forecast.temperature_2m_max[i]}°C</p>
                <p>Min Temp: ${forecast.temperature_2m_min[i]}°C</p>
            </div>
        `;
    }
}

// Sections show and hide
document.getElementById('show-today').addEventListener('click', () => {
    document.getElementById('weather-info').style.display = 'block';
    document.getElementById('forecast-info').style.display = 'none';
    toggleActiveLink('show-today');
});

document.getElementById('show-forecast').addEventListener('click', () => {
    document.getElementById('forecast-info').style.display = 'block';
    document.getElementById('weather-info').style.display = 'none';
    toggleActiveLink('show-forecast');
});

// Active navigation link
function toggleActiveLink(activeId) {
    document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
    document.getElementById(activeId).classList.add('active');
}

// Default Today weather
document.getElementById('show-today').click();
