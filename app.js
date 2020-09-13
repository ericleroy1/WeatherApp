
const apiKey = "0f980128ca62c145b25f5e373a1f3b37";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?";

// These URL segments are used to build the 7-day forecast API fetch call
const forecastURL1 = "https://api.openweathermap.org/data/2.5/onecall?";
const forecastURL2 = "&exclude=hourly,minutely,current&units=metric&appid="


const searchbox = document.getElementById("city");
const submitButton = document.getElementById("submitButton")

var form = document.getElementById('mainForm')
submitButton.addEventListener('click', setQuery);

// Geolocation calls
const successCallback = (position) =>{
  let latitude = Math.round(position.coords.latitude);
  let longitude = Math.round(position.coords.longitude);
  console.log(latitude, longitude);
  getLocationResults(latitude, longitude);
};
const errorCallback = (position  =>{
  console.log(position)
});


// CHECKBOX STEP 1 for curent location data
function checkedBox(){
  console.log("hello")
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

// STEP 1 Captures value of input
function setQuery(e){
  city = searchbox.value;
  getData1();
  e.preventDefault();
  mainForm.reset();
}

// STEP 2 Gets the current weather data - calls displayResults()
function getData1(){
  fetch(baseURL + "q=" + city + "&units=metric&appid=" + apiKey)
  .then(weather => {
    return weather.json();
  }).then(displayResults);
};

// STEP 4 Gets the forecast weather data - gets called inside displayresults() - calls forecastResults()
function getData2(lon, lat){
  console.log(lon, lat);
  var newURL = forecastURL1 + "lat=" + lat + "&lon=" + lon + forecastURL2 + apiKey;
  console.log(newURL);

  fetch(forecastURL1 + "lat=" + lat + "&lon=" + lon + forecastURL2 + apiKey)
  .then(response => {
    return response.json();
  }).then(forecastResults);

}

// STEP 3 Renders current results - gets called inside getData1() - triggers getData2()
function displayResults(weather){
  getData2(weather.coord.lon, weather.coord.lat);
  document.getElementById("cityDiv").innerText = weather.name + ", " + weather.sys.country;
  document.getElementById("tempDiv").innerText = Math.round(weather.main.temp) + "°c";
  document.getElementById("tempRange").innerText = Math.round(weather.main.temp_min) + "°c / " + Math.round(weather.main.temp_max) + "°c";
  document.getElementById("humidityDiv").innerText = weather.main.humidity + "% humidity";
  document.getElementById("conditionDiv").innerText = weather.weather[0].description;
}

// STEP 5 Gets called inside getData2() - gets the 7-day forecast data
function forecastResults(response){
  console.log(response.daily)
}

// CHECKBOX STEP 2 - gets called by checkbox and geolocates then goes to STEP 3 in main steps
function getLocationResults(latitude, longitude){
  fetch(baseURL + "lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=" + apiKey)
  .then(weather => {
    return weather.json();
  }).then(displayResults);
}
