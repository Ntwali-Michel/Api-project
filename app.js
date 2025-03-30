document.getElementById('check-weather').addEventListener('click', async function () {
    const city = document.getElementById('city').value;
    const resultBox = document.getElementById('result');
    resultBox.innerHTML = 'Fetching weather data...';

    try {
        const weatherData = await fetchWeatherData(city);
        if (weatherData) {
            resultBox.innerHTML = formatWeather(weatherData);
        } else {
            resultBox.innerHTML = '<p>No weather information available.</p>';
        }
    } catch (error) {
        resultBox.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        console.error('Error:', error);
    }
});


async function fetchWeatherData(city) {
    
    const geoData = await getCityCoordinates(city);
    if (!geoData) return null;  

    const { lat, lon } = geoData;
    const alt = 0;  
    const startDate = '2020-01-01';  
    const endDate = '2020-12-31';    

    const url = `https://meteostat.p.rapidapi.com/point/monthly?lat=${lat}&lon=${lon}&alt=${alt}&start=${startDate}&end=${endDate}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '416a25a3a3mshbbe9a5565153fd1p1ee0c0jsnb9b2b47a3db1',
            'x-rapidapi-host': 'meteostat.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Weather data fetch failed');
        }
        const data = await response.json();
        console.log('Weather Data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}


async function getCityCoordinates(city) {
    
    
    
    const coordinates = {
        'Berlin': { lat: 52.5244, lon: 13.4105 },
        'London': { lat: 51.5074, lon: -0.1278 },
        'New York': { lat: 40.7128, lon: -74.0060 }
    };

    return coordinates[city] || null;  
}


function formatWeather(data) {
    
    if (!data || !data.data) return '<p>No data available</p>';

    let weatherInfo = '<h3>Temperature Data</h3>';
    data.data.forEach(month => {
        weatherInfo += `
            <p><strong>Month:</strong> ${month.month}</p>
            <p><strong>Temperature:</strong> ${month.temp}°C</p>
            <hr />
        `;
    });
    return weatherInfo;
}
