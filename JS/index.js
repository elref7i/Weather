'use strict';
//* HTML element
let allWeather = document.querySelector('.all-weather');
let locationNow = document.querySelector('.location-now');
let currentTime = document.querySelector('.time-now');
let modeIcons = document.querySelectorAll('.mode');
let parenModeIcons = document.querySelectorAll('.icon-mode');
let allTextWite = document.querySelectorAll('.text-white');
let allBgdark = document.querySelectorAll('.bg-dark');
let allBgBlack = document.querySelectorAll('.bg-black');
console.log(allBgBlack);

//* App Variables
let spanCity = document.createElement('span');
let curTime = document.createElement('p');

spanCity.classList.add('fs-6', 'location-city');
curTime.classList.add('fs-3', 'location-city', 'm-0', 'fw-bold');
// //*
//* Functions
async function getCureentDay(country) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=3f2e331856f84a428f5191703240710&q=${country}=07112&days=7`
  );
  let data = await response.json();
  dispalyCureenweather(data);
  displayforceObject(data);
  console.log(data);
}
function transformFirstChar(str) {
  let nameCountry = str.charAt(0).toUpperCase() + str.slice(1, str.length);
  return nameCountry;
}
console.log();
getCureentDay(transformFirstChar('cairo'));

console.log();
function dispalyCureenweather(obj) {
  const date = new Date(obj.current.last_updated); // Your input date
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const time = new Date();
  const dayOfMonth = date.getDate();
  const dayName = days[date.getDay()];
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
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
  spanCity.textContent = `${obj.location.country}, ${obj.location.region}`;
  curTime.textContent = `${hours}:${minutes}:${seconds}`;
  locationNow.appendChild(spanCity);
  currentTime.appendChild(curTime);

  // getDay() returns a number between 0 (Sunday) and 6 (Saturday)
  // Output: Wednesday
}
function displayforceObject(obj) {
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
    console.log(obj.forecast.forecastday[i]);
    let cardForcastday = `  <div class="col-md-6 col-lg-3 text-center">
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
}
// *** function changeColor(ele, currentClass, repalceClass) {
//   for (let i = 0; i < ele.length; i++) {
//     ele[i].classList.replace(`${currentClass}`, `${repalceClass}`);
//   }
// }
for (let i = 0; i < modeIcons.length; i++) {
  modeIcons[i].addEventListener('click', function (e) {
    e.stopPropagation();
    let classActiveMode = document.querySelector('.icon-mode .active');
    classActiveMode.classList.remove('active');
    e.target.parentElement.classList.add('active');
    // console.log(e.target.getAttribute('data-light-mode'));
    if (e.target.getAttribute('data-light-mode')) {
      document.body.classList.remove('bg-black');
    } else {
      document.body.classList.add('bg-black');
    }
  });
}

//* Events
//* https://api.weatherapi.com/v1/current.json?key=3f2e331856f84a428f5191703240710&q=cairo
//*https://api.weatherapi.com/v1/forecast.json?key=3f2e331856f84a428f5191703240710&q&q=cairo=07112&days=7
