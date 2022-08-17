const img = document.querySelector("img");

async function getWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b29b3900687368d4dc487da1af69995f`
  );
  const searchData = await response.json();
  console.log(searchData);
  img.src = `http://openweathermap.org/img/wn/${searchData.weather[0].icon}@2x.png`;
}
