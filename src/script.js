function search(city) {
  let apiKey = "701f06352d61835bc4fc894e7b084629";
  let units = "imperial";
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
  let units = "imperial";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherConditions);
}

function getForecast(coordinates) {
  let apiKey = "701f06352d61835bc4fc894e7b084629";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherConditions(response) {
  let cityName = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityName}`;

  let currentDate = document.querySelector("#date-time");
  currentDate.innerHTML = formatDate(response.data.dt);

  let condition = response.data.weather[0].description;
  let weatherDescription = document.querySelector("p");
  weatherDescription.innerHTML = `${condition}`;

  let temperature = Math.round(response.data.main.temp);
  let highTemp = document.querySelector(".high");
  highTemp.innerHTML = `${temperature}`;

  let speed = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${speed} mph`;

  let humidity = response.data.main.humidity;
  let humidityPercent = document.querySelector("#humidity");
  humidityPercent.innerHTML = `${humidity}%`;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let fiveDayForecast = document.querySelector("#five-day-forecast");

  let fiveDayForecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      fiveDayForecastHTML =
        fiveDayForecastHTML +
        `
          <div class="col-4 day">${formatDay(forecastDay.dt)}</div>
          <div class="col-4 weatherIcon">
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }.png" class="fiveDayIcon" />
          </div>
          <div class="col-4 temp">
            <span class="fiveDayHigh"><strong>${Math.round(
              forecastDay.temp.max
            )}°&nbsp</strong></span>
            <span class="fiveDayLow"> ${Math.round(
              forecastDay.temp.min
            )}°</span>
          </div>
        `;
    }
  });

  fiveDayForecast.innerHTML = fiveDayForecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

function formatDate(timestamp) {
  let now = new Date(timestamp * 1000);

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

  return `Last updated: ${day}  ${hours}:${minutes}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let currentCityButton = document.querySelector("#current-city-button");
currentCityButton.addEventListener("click", handlePosition);

search("Houston");
