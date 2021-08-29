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

//search weather engine
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
