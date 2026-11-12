(function () {
  'use strict';
  const status = document.getElementById('weather-status');
  const city = document.getElementById('city-name');
  const buttons = document.querySelectorAll('[data-weather]');
  async function loadWeather(latitude, longitude, label) {
    buttons.forEach(button => { button.disabled = true; });
    status.textContent = 'Loading weather…';
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);
      let response;
      try {
        response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + encodeURIComponent(latitude) + '&longitude=' + encodeURIComponent(longitude) + '&current=temperature_2m,weather_code&timezone=auto', { signal: controller.signal });
      } finally { clearTimeout(timeout); }
      if (!response.ok) throw new Error('Weather unavailable');
      const data = await response.json();
      if (!data.current || !Number.isFinite(data.current.temperature_2m)) throw new Error('Invalid forecast');
      city.textContent = label;
      document.getElementById('temperature').textContent = Math.round(data.current.temperature_2m);
      const code = data.current.weather_code;
      document.getElementById('weather-description').textContent = code === 0 ? 'Clear sky' : code <= 3 ? 'Cloudy' : code <= 48 ? 'Fog' : code <= 67 ? 'Rain' : code <= 77 ? 'Snow' : code <= 82 ? 'Rain showers' : code <= 86 ? 'Snow showers' : 'Thunderstorms';
      status.textContent = 'Updated ' + new Date().toLocaleTimeString() + '. Forecast: Open-Meteo.';
    } catch (_) { status.textContent = 'Weather is unavailable. Please try again later.'; }
    finally { buttons.forEach(button => { button.disabled = false; }); }
  }
  document.querySelector('[data-weather="delhi"]').addEventListener('click', () => loadWeather(28.61, 77.21, 'Delhi'));
  document.querySelector('[data-weather="location"]').addEventListener('click', () => {
    if (!navigator.geolocation) { status.textContent = 'Location is not supported. You can load Delhi weather instead.'; return; }
    status.textContent = 'Waiting for location permission…';
    navigator.geolocation.getCurrentPosition(
      position => loadWeather(position.coords.latitude, position.coords.longitude, 'your location'),
      () => { status.textContent = 'Location was not shared. You can load Delhi weather instead.'; },
      { timeout: 10000, maximumAge: 300000, enableHighAccuracy: false }
    );
  });
})();
