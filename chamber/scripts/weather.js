// Port Harcourt Chamber of Commerce - weather.js
// Uses the OpenWeatherMap free "current weather" and "5 day / 3 hour forecast" endpoints.

const apiKey = "c0fe0525b656eadff12e931a77c04da3";
const lat = 4.8156;   // Port Harcourt, Nigeria
const lon = 7.0498;

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getCurrentWeather() {
  const response = await fetch(currentUrl);
  return await response.json();
}

async function getForecast() {
  const response = await fetch(forecastUrl);
  return await response.json();
}

function displayCurrentWeather(data) {
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;

  document.querySelector("#current-temp").textContent = `${temp}\u00B0C`;
  document.querySelector("#current-description").textContent =
    description.charAt(0).toUpperCase() + description.slice(1);
  document.querySelector("#current-icon").src =
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  document.querySelector("#current-icon").alt = description;
}

// The 5-day/3-hour endpoint returns 8 readings per day (every 3 hours).
// Pick the ~12:00 reading for each of the next 3 days to build a simple daily forecast.
function buildThreeDayForecast(forecastData) {
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const middayReadings = forecastData.list.filter((reading) =>
    reading.dt_txt.includes("12:00:00")
  );
  return middayReadings.slice(0, 3).map((reading) => {
    const date = new Date(reading.dt * 1000);
    return {
      label: dayLabels[date.getDay()],
      temp: Math.round(reading.main.temp),
      icon: reading.weather[0].icon,
      description: reading.weather[0].description,
    };
  });
}

function displayForecast(days) {
  const container = document.querySelector("#forecast");
  container.innerHTML = days
    .map(
      (day) => `
      <div class="forecast-day">
        <p class="forecast-label">${day.label}</p>
        <img src="https://openweathermap.org/img/wn/${day.icon}.png" alt="${day.description}" width="40" height="40">
        <p class="forecast-temp">${day.temp}&deg;C</p>
      </div>`
    )
    .join("");
}

async function loadWeather() {
  try {
    const current = await getCurrentWeather();
    displayCurrentWeather(current);

    const forecastData = await getForecast();
    const threeDay = buildThreeDayForecast(forecastData);
    displayForecast(threeDay);
  } catch (error) {
    document.querySelector("#weather-section").innerHTML +=
      "<p>Weather data is currently unavailable.</p>";
  }
}

loadWeather();
