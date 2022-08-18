const weatherBox = document.querySelector(".weather-box");
const temperature = document.querySelector(".temperature");
const wlocation = document.querySelector(".location-name");
const img = document.querySelector("img");
const weatherDescription = document.querySelector(".weather-description");
const feelsLike = document.querySelector(".feels-like");
const high = document.querySelector(".high");
const low = document.querySelector(".low");
const input = document.querySelector("input");
const search = document.querySelector(".search");
const unitBtn = document.querySelector(".change-unit");
const celBtn = document.querySelector(".celcius");
const farBtn = document.querySelector(".fahrenheit");

async function domController(city, unit = "imperial") {
  const cityData = await getWeather(city, unit);
  getTemp(cityData, unit);
  getLocation(cityData);
  getImg(cityData);
  weatherBox.classList.remove("hidden");
}

async function getWeather(city, unit) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=b29b3900687368d4dc487da1af69995f&units=${unit}`
  );
  const searchData = await response.json();
  return searchData;
}

function getImg(data) {
  img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  weatherDescription.textContent = data.weather[0].description;
}

function getTemp(data, unit) {
  let measurement;
  if (unit === "imperial") {
    measurement = "F";
    farBtn.style.color = "black";
    celBtn.style.color = "white";
  } else {
    measurement = "C";
    farBtn.style.color = "white";
    celBtn.style.color = "black";
  }
  temperature.textContent = data.main.temp + measurement;
  feelsLike.textContent = data.main.feels_like + measurement;
  high.textContent = data.main.temp_max + measurement;
  low.textContent = data.main.temp_min + measurement;
}

function getLocation(data) {
  wlocation.textContent = `${data.name}, ${data.sys.country}`;
}

search.onclick = () => domController(input.value);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    domController(input.value);
  }
});

unitBtn.onclick = async () => {
  let unit;
  if (weatherBox.classList.contains("far")) {
    unit = "metric";
    weatherBox.classList.remove("far");
    weatherBox.classList.add("cel");
  } else {
    unit = "imperial";
    weatherBox.classList.remove("cel");
    weatherBox.classList.add("far");
  }
  domController(input.value, unit);
};
