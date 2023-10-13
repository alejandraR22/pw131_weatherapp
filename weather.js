const apiKey = 'e1513b67c23d5c50b3a5b2a9d3a0e221';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locations = [
    { city: 'Plainfield', country: 'US' },
    { city: 'New York', country: 'US' },
    { city: 'California', country: 'US' },
    { city: 'Montana', country: 'US' },
    { city: 'Colorado', country: 'US' }
];

async function getWeather(city, country, index) {
    const response = await fetch(`${apiUrl}?q=${city},${country}&appid=${apiKey}`);
    const data = await response.json();

    if (data.weather) {
        const weather = data.weather[0];
        const temperatureCelsius = data.main.temp - 273.15;
        const temperatureFahrenheit = (temperatureCelsius * 9/5) + 32;

        const weatherIcon = document.getElementById(`weather-icon-${index}`);
        weatherIcon.src = `https://openweathermap.org/img/wn/${weather.icon}.png`;

        document.getElementById(`day-${index}`).innerHTML = `City: ${data.name}, ${data.sys.country}`;
        document.getElementById(`temperature-${index}`).innerHTML = `Temperature: ${temperatureFahrenheit.toFixed(2)}°F (${temperatureCelsius.toFixed(2)}°C)`;
        document.getElementById(`forecast-${index}`).innerHTML = `Weather: ${weather.description}`;
        document.getElementById(`humidity-${index}`).innerHTML = `Humidity: ${data.main.humidity}%`;
    } else {
        console.error("API Error:", data.message);
    }
}

locations.forEach((location, index) => {
    getWeather(location.city, location.country, index);
});

function refreshWeatherData() {
    locations.forEach((location, index) => {
        getWeather(location.city, location.country, index);
    });
}

setInterval(refreshWeatherData, 30 * 60 * 1000);


