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

// Function to fetch weather data
async function fetchWeatherData(city) {
    const geoData = await getCityCoordinates(city);
    if (!geoData) return null;  // No coordinates found

    const { lat, lon } = geoData;
    const alt = 0;  // Altitude could be optional, set it to 0 if not available
    const startDate = '2020-01-01';  // Example start date (could be dynamic based on your needs)
    const endDate = '2020-12-31';    // Example end date (could be dynamic based on your needs)

    const url = `https://meteostat.p.rapidapi.com/point/monthly?lat=${lat}&lon=${lon}&alt=${alt}&start=${startDate}&end=${endDate}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '416a25a3a3mshbbe9a5565153fd1p1ee0c0jsnb9b2b47a3db1',  // Replace with your RapidAPI key
            'x-rapidapi-host': 'meteostat.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Weather data fetch failed');
        }
        const data = await response.json();
        console.log('Weather Data:', data);  // Log the entire data to inspect the structure
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Function to get city coordinates (latitude and longitude)
async function getCityCoordinates(city) {
    const coordinates = {
        'Berlin': { lat: 52.5244, lon: 13.4105 },
        'London': { lat: 51.5074, lon: -0.1278 },
        'New York': { lat: 40.7128, lon: -74.0060 }
    };

    return coordinates[city] || null;
}

// Function to format the weather data for display (showing only temperature)
function formatWeather(data) {
    // Check if data and data.data exist
    if (!data || !data.data) return '<p>No data available</p>';

    let weatherInfo = '<h3>Temperature Data</h3>';
    
    // Loop through the data and display temperature
    data.data.forEach(month => {
        // Check if month.temp exists (may need to adjust based on actual API response structure)
        if (month.temp) {
            weatherInfo += `
                <p><strong>Month:</strong> ${month.month}</p>
                <p><strong>Temperature:</strong> ${month.temp}°C</p>
                <hr />
            `;
        } else {
            console.log("Month data:", month);  // Log month data to help identify structure issues
            weatherInfo += `<p>Temperature data not available for ${month.month}</p>`;
        }
    });

    return weatherInfo;
}
