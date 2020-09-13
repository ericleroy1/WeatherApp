
const apiKey = "0f980128ca62c145b25f5e373a1f3b37";
const baseURL = "http://api.openweathermap.org/data/2.5/weather?q=";

const searchbox = document.getElementById("city");
const submitButton = document.getElementById("submitButton")

submitButton.addEventListener('click', setQuery);

function setQuery(e){
  city = searchbox.value;
  console.log(city);
  getData();
  e.preventDefault();
}

function getData(){
  fetch(baseURL + city + "&appid=" + apiKey)
  .then(response => response.json())
  .then(data => console.log(data));
}
