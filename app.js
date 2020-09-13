
const apiKey = "0f980128ca62c145b25f5e373a1f3b37";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?";

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
  fetch(baseURL + "q=" + city + "&units=metric&appid=" + apiKey)
  .then(weather => {
    return weather.json();
  }).then(displayResults);
}

function displayResults(weather){
  console.log(weather);
  document.getElementById("cityDiv").innerText = weather.name + ", " + weather.sys.country;
  document.getElementById("tempDiv").innerText = Math.round(weather.main.temp) + "°c";
  document.getElementById("tempRange").innerText = Math.round(weather.main.temp_min) + "°c / " + Math.round(weather.main.temp_max) + "°c";
  document.getElementById("humidityDiv").innerText = weather.main.humidity + "% humidity";
  document.getElementById("conditionDiv").innerText = weather.weather[0].description;
}

function getLocationResults(latitude, longitude){
  console.log(latitude, longitude);
  fetch(baseURL + "lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=" + apiKey)
  .then(weather => {
    return weather.json();
  }).then(displayResults);
}

const successCallback = (position) =>{
  let latitude = Math.round(position.coords.latitude);
  let longitude = Math.round(position.coords.longitude);
  console.log(latitude, longitude);
  getLocationResults(latitude, longitude);
};
const errorCallback = (position  =>{
  console.log(position)
});

function checkedBox(){
  console.log("hello")
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}
