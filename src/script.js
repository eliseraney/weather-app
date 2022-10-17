function search(city) {
  let apiKey = "701f06352d61835bc4fc894e7b084629";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherConditions);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

function handlePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findCurrentCity);
}

function findCurrentCity(position) {
  let apiKey = "701f06352d61835bc4fc894e7b084629";
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherConditions);
}

function displayWeatherConditions(response) {
  let cityName = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityName}`;

  let condition = response.data.weather[0].main;
  let weatherDescription = document.querySelector("p");
  weatherDescription.innerHTML = `${condition}`;

  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(celsiusTemperature);
  let highTemp = document.querySelector(".high");
  highTemp.innerHTML = `${temperature}`;

  let speed = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${speed}m/s`;

  let humidity = response.data.main.humidity;
  let humidityPercent = document.querySelector("#humidity");
  humidityPercent.innerHTML = `${humidity}%`;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  displayForecast();
}

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector(".high");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector(".high");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayForecast() {
  let fiveDayForecast = document.querySelector("#five-day-forecast");

  let fiveDayForecastHTML = "";

  let days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  days.forEach(function (day) {
    fiveDayForecastHTML =
      fiveDayForecastHTML +
      `
        <div class="col-4 day">${day}</div>
        <div class="col-4 sunny">
            <i class="fa-solid fa-sun"></i>
        </div>
        <div class="col-4">
          <span class="fiveDayHigh"><strong>88° </strong></span>
          <span class="fiveDayLow"> 58°</span>
        </div>
  `;
  });

  fiveDayForecast.innerHTML = fiveDayForecastHTML;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = now.getHours();

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDate = document.querySelector("#date-time");
currentDate.innerHTML = `${day}  ${hours}:${minutes}`;

let currentCityButton = document.querySelector("#current-city-button");
currentCityButton.addEventListener("click", handlePosition);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

search("Houston");
