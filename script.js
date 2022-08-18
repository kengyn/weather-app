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

async function domController(city) {
  const cityData = await getWeather(city);
  getTemp(cityData);
  getLocation(cityData);
  getImg(cityData);
  weatherBox.classList.remove("hidden");
}

async function getWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b29b3900687368d4dc487da1af69995f&units=imperial`
  );
  const searchData = await response.json();
  console.log(searchData);
  return searchData;
}

function getImg(data) {
  img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  weatherDescription.textContent = data.weather[0].description;
}

function getTemp(data) {
  temperature.textContent = data.main.temp;
  feelsLike.textContent = data.main.feels_like;
  high.textContent = data.main.temp_max;
  low.textContent = data.main.temp_min;
}

function getLocation(data) {
  wlocation.textContent = `${data.name}, ${data.sys.country}`;
}

search.onclick = () => domController(input.value);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    console.log("e");
    domController(input.value);
  }
});
