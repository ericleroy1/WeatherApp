
const apiKey = "0f980128ca62c145b25f5e373a1f3b37";
const baseURL = "http://api.openweathermap.org/data/2.5/weather?q=";

const searchbox = document.getElementById("city");
const submitButton = document.getElementById("submitButton")

var form = document.getElementById('mainForm')
submitButton.addEventListener('click', setQuery);

function setQuery(e){
  city = searchbox.value;
  getData();
  e.preventDefault();
  mainForm.reset();
}

function getData(){
  fetch(baseURL + city + "&units=metric&appid=" + apiKey)
  .then(weather => {
    return weather.json();
  }).then(displayResults);
}

function displayResults(weather){
  document.getElementById("cityDiv").innerText = weather.name;
  document.getElementById("tempDiv").innerText = Math.round(weather.main.temp) + "°c";
  document.getElementById("humidityDiv").innerText = weather.main.humidity + "% humidity";
  document.getElementById("conditionDiv").innerText = weather.weather[0].description;
}
