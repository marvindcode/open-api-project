// Latitude and longitude of LA
const latitude = 36.7783;
const longitude = 118.2426;

// Fetch current weather
fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
.then((res) => { 
    return res.json();
})
.then((data) => {
    console.log("Weather data:", data);

    const weather = data.current_weather;
    console.log("Temperature (C):", weather.temperature);

})
.catch((error) => {
    console.log(error);
    const errorMessage = document.createElement('p');
    errorMesssage.innerText = error.message;
    errorMessage.classList.add("error");
    projectSection.appendChild(errorMessage);
})

