// const searchBox = document.querySelector('.search input');
// const searchBtn = document.querySelector('.search button');
// const weatherIcon = document.querySelector('.weather-icon');

// async function checkWeather(city) {
//   try {
//     const response = await fetch(`/weather?city=${city}`);

//     const data = await response.json();
//     if (response.status === 404) {
//       document.querySelector('.error').style.display = 'block';
//       document.querySelector('.weather').style.display = 'none';
//     } else {
//       document.querySelector('.city').innerHTML = data.name;
//       document.querySelector('.temp').innerHTML =
//         Math.round(data.main.temp) + '°c';
//       document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
//       document.querySelector('.wind').innerHTML = data.wind.speed + ' Km/h';

//       if (data.weather[0].main == 'Clouds') {
//         weatherIcon.src = 'images/clouds.png';
//       } else if (data.weather[0].main == 'Clear') {
//         weatherIcon.src = 'images/clear.png';
//       } else if (data.weather[0].main == 'Rain') {
//         weatherIcon.src = 'images/rain.png';
//       } else if (data.weather[0].main == 'Drizzle') {
//         weatherIcon.src = 'images/drizzle.png';
//       } else if (data.weather[0].main == 'Mist') {
//         weatherIcon.src = 'images/mist.png';
//       }
//       document.querySelector('.weather').style.display = 'block';
//       document.querySelector('.error').style.display = 'none';
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }
// searchBtn.addEventListener('click', () => {
//   checkWeather(searchBox.value);
// });

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
  try {
    const response = await fetch(`/weather?city=${city}`);
    const data = await response.json();

    if (!data.name) {
      document.querySelector('.error').innerHTML = 'City not found';
      document.querySelector('.error').style.display = 'block';
      document.querySelector('.weather').style.display = 'none';
    } else {
      document.querySelector('.city').innerHTML = data.name;

      if (data.main && data.main.temp !== undefined) {
        document.querySelector('.temp').innerHTML =
          Math.round(data.main.temp) + '°c';
        document.querySelector('.humidity').innerHTML =
          data.main.humidity + '%';
      } else {
        document.querySelector('.temp').innerHTML = 'N/A';
        document.querySelector('.humidity').innerHTML = 'N/A';
      }

      document.querySelector('.wind').innerHTML =
        data.wind && data.wind.speed ? data.wind.speed + ' Km/h' : 'N/A';

      // Update the weather icon based on the data.weather[0].main value
      updateWeatherIcon(
        data.weather && data.weather[0] ? data.weather[0].main : ''
      );

      document.querySelector('.weather').style.display = 'block';
      document.querySelector('.error').style.display = 'none';
    }
  } catch (error) {}
}

function updateWeatherIcon(weatherCondition) {
  switch (weatherCondition) {
    case 'Clouds':
      weatherIcon.src = 'images/clouds.png';
      break;
    case 'Clear':
      weatherIcon.src = 'images/clear.png';
      break;
    case 'Rain':
      weatherIcon.src = 'images/rain.png';
      break;
    case 'Drizzle':
      weatherIcon.src = 'images/drizzle.png';
      break;
    case 'Mist':
      weatherIcon.src = 'images/mist.png';
      break;
    default:
      // Handle unknown weather conditions or set a default image
      weatherIcon.src = 'images/default.png';
  }
}

searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value);
});
