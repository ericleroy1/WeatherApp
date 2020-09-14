
const apiKey = "0f980128ca62c145b25f5e373a1f3b37";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?";

// Image URL segments
const imageURL1 = "http://openweathermap.org/img/wn/";
const imageURL2 = "@2x.png";

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
  getLocationResults(latitude, longitude);
};
const errorCallback = (position  =>{
  console.log(position)
});


// CHECKBOX STEP 1 for curent location data
function checkedBox(){
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
  var newURL = forecastURL1 + "lat=" + lat + "&lon=" + lon + forecastURL2 + apiKey;

  fetch(forecastURL1 + "lat=" + lat + "&lon=" + lon + forecastURL2 + apiKey)
  .then(response => {
    return response.json();
  }).then(forecastResults);

}

// STEP 3 Renders current results - gets called inside getData1() - triggers getData2() - renders background images
function displayResults(weather){
  getData2(weather.coord.lon, weather.coord.lat);
  document.getElementById("cityDiv").innerText = weather.name + ", " + weather.sys.country;
  document.getElementById("tempDiv").innerText = Math.round(weather.main.temp) + "°c";
  document.getElementById("tempRange").innerText = Math.round(weather.main.temp_min) + "°c / " + Math.round(weather.main.temp_max) + "°c";
  document.getElementById("humidityDiv").innerText = weather.main.humidity + "% humidity";
  document.getElementById("conditionDiv").innerText = weather.weather[0].description;
  document.getElementById("currentIcon").setAttribute("src", imageURL1 + weather.weather[0].icon + imageURL2);
  console.log(weather.weather[0].icon);
  if (weather.weather[0].icon == '01d'){
    document.getElementById("mainBody").style.backgroundImage="url(images/dayClear.jpg)";
  }else if (weather.weather[0].icon == '02d' || weather.weather[0].icon == '03d'){
    document.getElementById("mainBody").style.backgroundImage="url(images/dayFewclouds.jpg)";
  }else if (weather.weather[0].icon == '04d'){
    document.getElementById("mainBody").style.backgroundImage="url(images/dayBrokenclouds.jpg)";
  }else if (weather.weather[0].icon == '09d' || weather.weather[0].icon == '10d'){
    document.getElementById("mainBody").style.backgroundImage="url(images/dayRain.jpg)";
  }else if (weather.weather[0].icon == '11d' || weather.weather[0].icon == '11n'){
    document.getElementById("mainBody").style.backgroundImage="url(images/stormy.jpg)";
  }else if (weather.weather[0].icon == '13d' || weather.weather[0].icon == '13n'){
    document.getElementById("mainBody").style.backgroundImage="url(images/snow.jpg)";
  }else if (weather.weather[0].icon == '50d'){
    document.getElementById("mainBody").style.backgroundImage="url(images/dayMisty.jpg)";
  }else if (weather.weather[0].icon == '01n' || weather.weather[0].icon == '50n'){
    document.getElementById("mainBody").style.backgroundImage="url(images/nightClear.jpg)";
  }else if (weather.weather[0].icon == '02n' || weather.weather[0].icon == '03n' || weather.weather[0].icon == '04n'){
    document.getElementById("mainBody").style.backgroundImage="url(images/nightCloudy.jpg)";
  }else if (weather.weather[0].icon == '09n' || weather.weather[0].icon == '10n'){
    document.getElementById("mainBody").style.backgroundImage="url(images/nightRain.jpg)";
  }else (console.log("no pic"))
}

// STEP 5 Gets called inside getData2() - gets the 7-day forecast data
function forecastResults(response){
  let timestamps = [];
  let days = [];
  let weekdays = [];
  let maxTemps = [];
  let icons = [];
  for (i=1; i<8; i++){
    timestamps.push(response.daily[i].dt);
    maxTemps.push(Math.round(response.daily[i].temp.max)+"°c");
    icons.push(response.daily[i].weather[0].icon);
  };
  // Turns the UNIX timestamps into weekday abbreviations
  timestamps.forEach(timestamp => days.push(new Date(timestamp*1000)));
  days.forEach(day => weekdays.push(day.toDateString().substring(0,3)));

  for (i=0; i<7; i++){
    document.getElementById("day" + i).innerHTML = weekdays[i];
    document.getElementById("max" + i).innerHTML = maxTemps[i];
    document.getElementById("img" + i).setAttribute("src", imageURL1 + icons[i] + imageURL2);
  }

}

// CHECKBOX STEP 2 - gets called by checkbox and geolocates then goes to STEP 3 in main steps
function getLocationResults(latitude, longitude){
  fetch(baseURL + "lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=" + apiKey)
  .then(weather => {
    return weather.json();
  }).then(displayResults);
}
