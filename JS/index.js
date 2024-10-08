//* HTML element
let allWeather = document.querySelector('.all-weather');
let locationNow = document.querySelector('location-now');
//* App Variables
let spanCity = document.createElement('span');
spanCity.classList.add('fs-6', 'location-city');
//* Functions
async function getCureentDay(country) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=3f2e331856f84a428f5191703240710&q=${country}`
  );
  let currentWeather = await response.json();
  dispalyCureenweather(currentWeather);
  console.log(currentWeather);
}
getCureentDay('lodon');

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
  const dayOfMonth = date.getDate();
  const dayName = days[date.getDay()];
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
  locationNow.append(spanCity);
  spanCity.textContent(`${obj.location.country}, ${obj.location.region}}`);

  // getDay() returns a number between 0 (Sunday) and 6 (Saturday)
  // Output: Wednesday
}
//* Events
//* https://api.weatherapi.com/v1/current.json?key=3f2e331856f84a428f5191703240710&q=cairo
//*https://api.weatherapi.com/v1/forecast.json?key=3f2e331856f84a428f5191703240710&q&q=cairo=07112&days=7
