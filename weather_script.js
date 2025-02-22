const apiKey = "9cd21a430571e08e73f5bed41ec92ad3";

// Default coordinates for Atlanta, Georgia (latitude: 33.7490, longitude: -84.3880)
const defaultLocation = {
    lat: 33.7490,
    lon: -84.3880
};

function fetchWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const temp = Math.round(data.main.temp);
            const desc = data.weather[0].description;
            document.getElementById("weather-info").textContent = `${temp}°C | ${desc}`;
        })
        .catch(error => {
            document.getElementById("weather-info").textContent = "Weather unavailable";
        });
}

function getLocation() {
    if (navigator.geolocation) {
        // Try to get the user's location
        navigator.geolocation.getCurrentPosition(
            position => {
                fetchWeather(position.coords.latitude, position.coords.longitude);
            },
            () => {
                // If location access is denied or fails, use default location (Atlanta)
                fetchWeather(defaultLocation.lat, defaultLocation.lon);
            }
        );
    } else {
        // If geolocation is not supported, use default location (Atlanta)
        fetchWeather(defaultLocation.lat, defaultLocation.lon);
    }
}

getLocation();
