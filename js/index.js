//Dom Selection
const findLocation = document.querySelector('#findWeather');
findLocation.addEventListener('click', function () {
    findWeathers();
});

async function findWeathers() {
    const inputWeather = document.querySelector('#locationInput');
    const location = inputWeather.value; 

    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=1fd160b2a2ee4d39a0371311241112&q=${location}&days=3`);
        const data = await response.json();
        console.log(data);
        
        renderWeatherCards(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert('Error fetching weather data');
    }
}

function renderWeatherCards(data) {
    const weatherCardsContainer = document.getElementById('weatherCards');
    weatherCardsContainer.innerHTML = '';

    const days = data.forecast.forecastday;

    days.forEach(day => {
        const cardHTML = `
            <div class="weather-card">
                <div class="day-header">
                    <span>${new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</span>
                    <span>${new Date(day.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}</span>
                </div>
                <div class="weather-info">
                    <h2>${data.location.name}</h2>
                    <div class="temp">${day.day.avgtemp_c}&deg;C</div>
                    <div class="icon">
                        <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
                    </div>
                    <div class="description">${day.day.condition.text}</div>
                    <div class="details">
                        <span>Humidity: ${day.day.avghumidity}%</span>
                        <span>Wind: ${day.day.maxwind_kph}km/h</span>
                    </div>
                </div>
            </div>
        `;

        weatherCardsContainer.innerHTML += cardHTML;
    });
}
