const apiKey = "9cd21a430571e08e73f5bed41ec92ad3";

// Default coordinates for Atlanta, Georgia (latitude: 33.7490, longitude: -84.3880)
const defaultLocation = {
    lat: 33.9595626,
    lon: -84.3529257
};

function fetchWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const temp = Math.round(data.main.temp);
            const desc = data.weather[0].description;
            document.getElementById("weather-info").textContent = `${temp}°C | ${desc}`;
            // Change the background color of the weather tile
        changeBackgroundColor(desc); 
        })
        .catch(error => {
            document.getElementById("weather-info").textContent = "Weather unavailable";
        });
}

function changeBackgroundColor(weatherDescription) {
    let backgroundColor;

    // Simple mapping of weather description to background colors
    switch (weatherDescription.toLowerCase()) {
        case 'clear sky':
            backgroundColor = "#87CEEB"; // Sky Blue for clear sky
            break;
        case 'few clouds':
        case 'scattered clouds':
            backgroundColor = "#B0C4DE"; // Light Steel Blue for cloudy weather
            break;
        case 'overcast clouds':
            backgroundColor = "#A9A9A9"; // Dark Gray for overcast weather
            break;
        case 'rain':
        case 'shower rain':
            backgroundColor = "#4682B4"; // Steel Blue for rain
            break;
        case 'snow':
            backgroundColor = "#FFFFFF"; // White for snow
            break;
        case 'thunderstorm':
            backgroundColor = "#2F4F4F"; // Dark Slate Gray for thunderstorms
            break;
        case 'mist':
        case 'haze':
            backgroundColor = "#D3D3D3"; // Light Gray for mist/haze
            break;
        default:
            backgroundColor = "#000000"; // Default black background
    }

    // Apply background color to the weather tile
    document.getElementById("weather-tile").style.backgroundColor = backgroundColor;
}

// Fetch weather data for Atlanta without asking for the user's location
fetchWeather(defaultLocation.lat, defaultLocation.lon);
