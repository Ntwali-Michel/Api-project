document.getElementById('check-weather').addEventListener('click', async function () {
    const city = document.getElementById('city').value;
    const resultBox = document.getElementById('result');
    resultBox.innerHTML = 'Fetching weather data...';

    try {
        const responseData = await fetchWeather(city);
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

async function fetchWeather(city) {
    const url = `https://api.api-ninjas.com/v1/weather?city=${city}`;
    const options = {
        method: 'GET',
        headers: {
            'X-Api-Key': '0affb34ebfmshe4e5ed37735ea66p1000cbjsnbc8517b09c75'
        }
    };

    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
    }
    return await response.json();
}

function formatWeather(data) {
    return `
        <p><strong>City:</strong> ${data.city || 'N/A'}</p>
        <p><strong>Temperature:</strong> ${data.temp}°C</p>
        <p><strong>Humidity:</strong> ${data.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind_speed} m/s</p>
    `;
}