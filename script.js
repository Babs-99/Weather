const apiKey = '7dd595555b106d5224b3ff21911460b0';
let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric';

const weatherIcon = document.querySelector(".weather-icon");

async function getWeather(city) {
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(apiUrl);
        if (response.status == 404) {
            document.querySelector(".error-message").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            const data = await response.json();
            console.log(data);

            //updates the weather details on the webpage
            document.querySelector('.temperature').textContent = `${Math.round(data.main.temp)}°C`;
            document.querySelector('.city').textContent = data.name;
            document.querySelector('.description').textContent = data.weather[0].description;
            document.querySelector('.wind').textContent = `${data.wind.speed} km/h`;

            //updates the weather icon, background and the card color based on the weather type
            updateWeatherIcon(data.weather[0].main);
            updateBackground(data.weather[0].main);
            updateBackgroundColor(data.weather[0].main);
            
            document.querySelector('.weather').style.display = "block";
        }
    } catch (error) {
        console.log('Error fetching weather data:', error);
    }
}

//function to update the weather icon based on weather type
function updateWeatherIcon(weatherType) {
    switch (weatherType) {
        case 'Clouds':
            weatherIcon.src = "images/cloudy.png";
            break;
        case 'Clear':
            weatherIcon.src = "images/clear.png";
            break;
            case 'Snow':
                weatherIcon.src = "images/snowy.png";
                break;
        case 'Rain':
        case 'Drizzle':
            weatherIcon.src = "images/raining.png";
            break;
        case 'Mist':
            weatherIcon.src = "images/misty.png";
            break;
        default:
            //defaults to a generic weather icon
            weatherIcon.src = "images/default.png";
    }
}

//function to update the background based on the weather type
function updateBackground(weatherType) {
    const body = document.body;
    switch (weatherType) {
        case 'Clear':
            body.style.backgroundImage = 'url("https://i.pinimg.com/originals/d0/f1/1e/d0f11e5808e95e24a516a9b163704dfd.gif")';
            break;
        case 'Clouds':
        case 'Mist':
            body.style.backgroundImage = 'url("https://i.pinimg.com/originals/19/9d/36/199d3683f2b758b695545e095352f840.gif")';
            break;
        case 'Rain':
        case 'Drizzle':
        case 'Thunderstorm':
            body.style.backgroundImage = 'url("https://i.pinimg.com/originals/73/94/32/739432d532bf90abdadbeea579abc21b.gif")';
            break;
        case 'Snow':
            body.style.backgroundImage = 'url("https://i.pinimg.com/originals/98/54/1c/98541c91800c40f1877935e734a3bb9e.gif")';
            break;
        default:
            body.style.backgroundImage = 'url("images/giphy\ \(1\).gif")';
    }
}

function updateBackgroundColor(weatherType) {
    const weatherContainer = document.querySelector('.weather-container');
    let color;
    switch (weatherType) {
        case 'Clear':
            color = 'linear-gradient(135deg, #c45100, #a81f4b)'; 
            break;
        case 'Clouds':
        case 'Mist':
            color = 'linear-gradient(135deg, #777777, #88989d)'; 
            break;
        case 'Rain':
        case 'Drizzle':
        case 'Thunderstorm':
            color = 'linear-gradient(135deg, #4d4d99, #5280aa, #5cafc1)'; 
            break;
        case 'Snow':
            color = 'linear-gradient(135deg, #a5b8ff, #9bc4f3)'; 
            break;
        default:
            color = 'linear-gradient(135deg, #c45100, #a81f4b)'; // Darker shades of orange and pink
    }
    weatherContainer.style.background = color;
}


//calls the function to fetch the weather data when the page loads
window.onload = function() {
    const searchButton = document.querySelector('.search button');
    const searchInput = document.querySelector('.search input');

    function handleSearch() {
        const cityName = searchInput.value;
        getWeather(cityName);
    }

    searchButton.addEventListener('click', handleSearch);

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });
};
