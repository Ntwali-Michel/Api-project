
const apiKey = '18c1329a2712fdd76fe30ac0c21e21e0';

document.getElementById('getWeatherBtn').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    document.getElementById('weatherResult').innerText = 'Please enter a city name.';
    return;
  }
  
  // Construct the API URL (using the Current Weather Data endpoint)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  
  // Fetch the weather data
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText} (Status Code: ${response.status})`);
      }
      return response.json();
    })
    .then(data => {
      // Check if the API response indicates a valid result
      if (data.cod !== 200) {
        throw new Error(data.message);
      }
      
      // Build a string with the weather details
      const weatherDetails = `
        <h2>Weather in ${data.name}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
      `;
      
      // Display the weather details
      document.getElementById('weatherResult').innerHTML = weatherDetails;
    })
    .catch(error => {
      // Display error message
      document.getElementById('weatherResult').innerText = `Error: ${error.message}`;
    });
});
