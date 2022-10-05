///date + time info///
let currentTime = new Date();
let dateElement = document.querySelector("#date");

let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = currentTime.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dayIndex = currentTime.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let dayNumber = currentTime.getDate();

let monthIndex = currentTime.getMonth();
let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

let year = currentTime.getFullYear();

dateElement.innerHTML = `${hours}:${minutes}<br /> ${days[dayIndex]} • ${months[monthIndex]} ${dayNumber} ${year}`;

///temp & location info + forecast///

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Wed", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2"><div class="js-container" id="forecast">
<div class="day-name">${day}</div>
        <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="" width="42" /><span class="forecast-max">50° |</span>
        <span class="forecast-min">40°</span>
					<div class="weather-text-2">Cloudy</div>
</div>
  </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayWeatherCondition(response) {
  document.querySelector(
    "#city"
  ).innerHTML = `<i class="fa-solid fa-location-dot location"></i> ${response.data.name}`;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );

  fahrenheitTemperature = response.data.main.temp;
  celciusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  let celciusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#search-button");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitTemperature = null;
let celciusTemperature = null;

searchCity("New York");

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

///forecast///
displayForecast();
