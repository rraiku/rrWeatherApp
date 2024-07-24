
async function fetchWeather(city) {
    const apiKey = '348f106644443326d4aea9c27276db27';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        throw new Error(data.message);
    }
}


function displayWeather(weather) {
    const weatherInfoDiv = document.getElementById('weather-info');
    const iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    const tempFahrenheit = ((weather.main.temp - 273.15) * 9/5 + 32).toFixed(2); 
    weatherInfoDiv.innerHTML = `
        <h2>${weather.name}</h2>
        <img src="${iconUrl}" alt="Weather icon">
        <p class="temp">${tempFahrenheit}&deg;F</p>
        <p>Humidity: ${weather.main.humidity}%</p>
        <p>Conditions: ${weather.weather[0].description}</p>
    `;
}


function displayError(message) {
    const weatherInfoDiv = document.getElementById('weather-info');
    weatherInfoDiv.innerHTML = `<p class="error">${message}</p>`;
}


function searchWeather() {
    const city = document.getElementById('city').value;
    fetchWeather(city)
        .then(data => displayWeather(data))
        .catch(error => displayError('City not found. Please enter a valid city name.'));
}


document.querySelector('button').addEventListener('click', searchWeather);