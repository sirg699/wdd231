// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = "https://api.openweathermap.org/data/2.5/weather?lat=49.752167&lon=6.632637&units=metric&appid=c0fe0525b656eadff12e931a77c04da3";

async function apiFetch() {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayResults(data);   // <-- This line must NOT be commented out
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    console.error(error);
  }
}

function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;C`;

  const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  weatherIcon.setAttribute("src", iconSrc);
  weatherIcon.setAttribute("alt", data.weather[0].description);

  captionDesc.textContent = data.weather[0].description;
}

apiFetch();