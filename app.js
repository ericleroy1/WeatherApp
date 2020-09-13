
const apiKey = "0f980128ca62c145b25f5e373a1f3b37";


// document.getElementById('inputCity').addEventListener("submit", function(){
// //
//   let city = document.getElementById('city').value;
//   let url = "http://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + city + "&units=metric"
// //
//   console.log(city);
//   console.log(apiKey)
//   console.log(url);
//
// });



function submitCity(){

  console.log("submitted")
  city = document.getElementById('city').value;
  url = "http://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + city + "&units=metric"

  console.log(city, url)

    function getData(){
      fetch(url)
      .then(response => response.json())
      .then(data => console.log(data));
    }

getData()

  }
