'use strict';
//* HTML element
let allWeather = document.querySelector('.all-weather');
let inputSearch = document.querySelector('.search');
let locationNow = document.querySelector('.location-now');
let currentTime = document.querySelector('.time-now');
let datacurrentday = document.querySelector('.data-current-day');
let darkMode = document.querySelector('.dark-mode');
let lightMode = document.querySelector('.light-mode');
let parenModeIcons = document.querySelectorAll('.icon-mode');
//* App Variables
let spanCity = document.createElement('span');
let curTime = document.createElement('p');
let ampm = document.createElement('span');
ampm.classList.add('fs-5', 'text-danger');
spanCity.classList.add('fs-6', 'location-city');
curTime.classList.add('fs-4', 'location-city', 'm-0', 'fw-bold');
// //*
//* Functions
async function getCureentDay(country) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=3f2e331856f84a428f5191703240710&q=${country}=07112&days=7`
  );
  let data = await response.json();
  dispalyDataWeather(data);
}
function transformFirstChar(str) {
  let nameCountry = str.charAt(0).toUpperCase() + str.slice(1, str.length);
  return nameCountry;
}

getCureentDay(transformFirstChar('cairo'));

function dispalyDataWeather(obj) {
  allWeather.innerHTML = '';
  const apiDate = obj.location.localtime;
  const date = new Date(apiDate);

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dayOfMonth = date.getDay();
  const dayName = days[date.getDay()];
  const hours = date.getHours();
  const minutes = date.getMinutes();

  let currentDayWeather = `<div class="col-md-6 col-lg-3 data-current-day">
              <div class="card bg-dark text-white shadow-lg p-2">
                <div class="title-weather d-flex justify-content-between align-items-center p-2">
                  <h5 class="day-current text-capitalize" id="day-current">${dayName}</h5>
                  <h6 class="date-day text-capitalize "><span class="text-danger pe-1 fs-5">${dayOfMonth}</span>October
                  </h6>
                </div>
                <div class="card-body bg-black p-3">
                  <h3 class="text-danger">${obj.location.name}</h3>
                  <div class="data-temp d-flex justify-content-between align-items-center">
                    <h4 class="Temperature fs-1">${obj.current.dewpoint_c}<sup class="text-danger px-1">o</sup>C</h4>
                    <div class="image-temperature">
                      <img src="${obj.current.condition.icon}" class="" alt="">
                    </div>
                  </div>
                  <h5 class="text-primary ">${obj.current.condition.text}</h5>
                  <div class="Percentage-of-heat | pt-3 d-flex align-items-center justify-content-between flex-wrap">
                    <article class="d-flex justify-content-center align-items-start gap-1 ">
                      <img src="https://routeweather.netlify.app/images/icon-umberella.png" alt="">
                      <h6>18km/h</h6>
                    </article>
                    <article class="d-flex justify-content-center align-items-start gap-1 ">
                      <img src="https://routeweather.netlify.app/images/icon-wind.png" alt="">
                      <h6>18km/h</h6>
                    </article>
                    <article class="d-flex justify-content-center align-items-start gap-1 ">
                      <img src="https://routeweather.netlify.app/images/icon-compass.png" alt="">
                      <h6>East</h6>
                    </article>
                  </div>
                </div>
              </div>
            </div>`;
  allWeather.innerHTML += currentDayWeather;

  for (let i = 1; i <= 3; i++) {
    const date = new Date(obj.forecast.forecastday[i].date); // Your input date
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const dayName = days[date.getDay()];
    let cardForcastday = `<div class="col-md-6 col-lg-3 text-center">
              <div class="card bg-dark text-white shadow-lg p-2 h-100">
                <div class="title-weather  p-2">
                  <h5 class="day-current text-capitalize">${dayName}</h5>
                </div>
                <div class="card-body bg-black p-3">
                  <div class="data-temp">
                    <div class="image-temperature">
                      <img src="${obj.forecast.forecastday[i].day.condition.icon}" class="mb-2" alt="">
                    </div>
                    <h4 class="maxtemp mb-2">${obj.forecast.forecastday[i].day.maxtemp_c}<sup class="text-danger px-1">o</sup>C</h4>
                    <h5 class="min-temp h6 mb-3">${obj.forecast.forecastday[i].day.mintemp_c}<sup class="ps-1 text-danger">o</sup></h5>
                  </div>
                  <h5 class="text-primary ">${obj.forecast.forecastday[i].day.condition.text}</h5>
                </div>
              </div>
            </div>`;
    allWeather.innerHTML += cardForcastday;
  }
  spanCity.textContent = `${obj.location.country}, ${obj.location.region}`;
  curTime.textContent = `${hours}:${minutes}`;
  ampm.textContent = `${hours <= 12 ? 'am' : 'pm'}`.toUpperCase();
  locationNow.appendChild(spanCity);
  currentTime.prepend(curTime);
  curTime.after(ampm);
  // getDay() returns a number between 0 (Sunday) and 6 (Saturday)
  // Output: Wednesday
}

inputSearch.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    getCureentDay(transformFirstChar(inputSearch.value || 'cairo'));
    inputSearch.value = '';
    e.preventDefault();
  }
});
inputSearch.addEventListener('input', function () {
  getCureentDay(transformFirstChar(inputSearch.value || 'cairo'));
});

//* Dark Mode

darkMode.addEventListener('click', function (e) {
  darkMode.parentElement.classList.add('d-none');
  lightMode.parentElement.classList.remove('d-none');
  document.body.classList.add('bg-black');
  localStorage.setItem('mode', 'light');
});

lightMode.addEventListener('click', function (e) {
  lightMode.parentElement.classList.add('d-none');
  darkMode.parentElement.classList.remove('d-none');
  document.body.classList.remove('bg-black');
  localStorage.setItem('mode', 'dark');
});

// *** function changeColor(ele, currentClass, repalceClass) {

//* Events
//* https://api.weatherapi.com/v1/current.json?key=3f2e331856f84a428f5191703240710&q=cairo
//*https://api.weatherapi.com/v1/forecast.json?key=3f2e331856f84a428f5191703240710&q&q=cairo=07112&days=7
