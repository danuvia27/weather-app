//current time/date
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return `${days[dayIndex]} ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#date-time");
let currentTime = new Date();

dateElement.innerHTML = formatDate(currentTime);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
       <div class="col-2">
         <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
         
           <br>
           <img
           src="http://openweathermap.org/img/wn/${
             forecastDay.weather[0].icon
           }@2x.png"
           alt=""
           width="42"
        <br />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">
           ${Math.round(forecastDay.temp.max)} °        
          </span>
          <span class="weather-forecast-temperature-min">
          ${Math.round(forecastDay.temp.min)}°
        </span>
      </div>
     </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "500ad9e053abf399ecb2669d220f8e83";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function cityTemprature(response) {
  let cityElement = document.querySelector("#city");
  let tempratureElement = document.querySelector("#temprature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = (document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  ));
  let iconELement = document.querySelector("#icon");

  celsiusTemprature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  tempratureElement.innerHTML = Math.round(celsiusTemprature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconELement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "500ad9e053abf399ecb2669d220f8e83";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(cityTemprature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function displayFahrenheitTemprature(event) {
  event.preventDefault();
  let fahrenheitTemprature = (celsiusTemprature * 9) / 5 + 32;
  let tempratureElement = document.querySelector("#temprature");
  tempratureElement.innerHTML = Math.round(fahrenheitTemprature);
}

function displayCelsiusTemprature(event) {
  event.preventDefault();
  let tempratureElement = document.querySelector("#temprature");
  tempratureElement.innerHTML = Math.round(celsiusTemprature);
}

let celsiusTemprature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemprature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemprature);

searchCity("San Diego");
