document.getElementById('check-weather').addEventListener('click', async function () {
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    const resultBox = document.getElementById('result');
    resultBox.innerHTML = 'Fetching weather data...';

    try {
        const responseData = await fetchWeatherData(city, country);
        if (responseData) {
            resultBox.innerHTML = formatWeather(responseData);
        } else {
            resultBox.innerHTML = '<p>No weather information available.</p>';
        }
    } catch (error) {
        resultBox.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        console.error('Error:', error);
    }
});

async function fetchWeatherData(city, country) {
    const apiKey = '416a25a3a3mshbbe9a5565153fd1p1ee0c0jsnb9b2b47a3db1'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);  
            throw new Error(errorData.message || 'Weather data fetch failed');
        }
        const data = await response.json();
        console.log('Weather Data:', data);  
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

function formatWeather(data) {
    if (!data) return '<p>No data available</p>';

    return `
        <p><strong>City:</strong> ${data.name || 'N/A'}</p>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
}
