document.getElementById('check-weather').addEventListener('click', async function () {
    const city = document.getElementById('city').value.trim(); // Trim spaces
    const country = "US"; // Change this to user input or default to a country
    const resultBox = document.getElementById('result');

    if (!city) {
        resultBox.innerHTML = '<p style="color: red;">Please enter a valid city name.</p>';
        return;
    }

    resultBox.innerHTML = 'Fetching weather data...';

    try {
        const responseData = await fetchWeatherData(city, country);
        if (responseData && responseData.main) {
            resultBox.innerHTML = formatWeather(responseData);
        } else {
            resultBox.innerHTML = '<p style="color: red;">Weather data not available. Check city and try again.</p>';
        }
    } catch (error) {
        resultBox.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        console.error('Error:', error);
    }
});

async function fetchWeatherData(city, country) {
    const url = `https://open-weather13.p.rapidapi.com/city/${city}/${country}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '0affb34ebfmshe4e5ed37735ea66p1000cbjsnbc8517b09c75', 
            'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `API request failed with status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

function formatWeather(data) {
    return `
        <p><strong>City:</strong> ${data.name || 'N/A'}</p>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
}
