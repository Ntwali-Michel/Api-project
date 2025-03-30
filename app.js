document.getElementById('check-weather').addEventListener('click', async function () {
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    const resultBox = document.getElementById('result');
    resultBox.innerHTML = 'Fetching weather data...';

    try {
        const responseData = await fetchWeatherData(country, city);
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

async function fetchWeatherData(country, city) {
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
        <p><strong>City:</strong> ${data.city || 'N/A'}</p>
        <p><strong>Temperature:</strong> ${data.temp}°C</p>
        <p><strong>Humidity:</strong> ${data.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind_speed} m/s</p>
    `;
}
