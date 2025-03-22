const apiKey = "d71349069927a73df5c5334b3af648d6"; // Your OpenWeatherMap API key
const city = "Laoag"; // Change this to your desired location
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById("weather-description").textContent = `Condition: ${data.weather[0].description}`;
        
        document.getElementById("high-temp").textContent = `High: ${data.main.temp_max}°C`;
        document.getElementById("low-temp").textContent = `Low: ${data.main.temp_min}°C`;
        document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
        
        const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        document.getElementById("sunrise").textContent = `Sunrise: ${sunriseTime}`;
        document.getElementById("sunset").textContent = `Sunset: ${sunsetTime}`;

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        const data = await response.json();
        const forecastDays = {};

        // Process next 3 days of forecast data
        data.list.forEach(entry => {
            const date = new Date(entry.dt * 1000).toLocaleDateString("en-US", { weekday: "long" });
            if (!forecastDays[date]) {
                forecastDays[date] = entry.main.temp;
            }
        });

        // Set forecast temperatures
        const forecastKeys = Object.keys(forecastDays);
        if (forecastKeys.length >= 3) {
            document.getElementById("today-temp").textContent = `${forecastDays[forecastKeys[0]]}°C`;
            document.getElementById("wednesday-temp").textContent = `${forecastDays[forecastKeys[1]]}°C`;
            document.getElementById("thursday-temp").textContent = `${forecastDays[forecastKeys[2]]}°C`;
        }
    } catch (error) {
        console.error("Error fetching weather forecast:", error);
    }
}

// Call functions on page load
fetchWeather();
fetchForecast();
