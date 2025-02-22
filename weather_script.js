const apiKey = "9cd21a430571e08e73f5bed41ec92ad3";

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
        navigator.geolocation.getCurrentPosition(
            position => {
                fetchWeather(position.coords.latitude, position.coords.longitude);
            },
            () => {
                document.getElementById("weather-info").textContent = "Location blocked";
            }
        );
    } else {
        document.getElementById("weather-info").textContent = "Geolocation not supported";
    }
}

getLocation();
