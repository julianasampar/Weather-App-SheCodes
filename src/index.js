// Sets the current Time

let now = new Date();

let hour = now.getHours();
let minute = now.getMinutes();
let day = now.getDay();
let date = now.getDate();
let month = now.getMonth();
let year = now.getFullYear();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var suffix;

// FIX!!! Add suffix for 11st, 12nd, 13rd, etc...
function getSuffix(date) { 
 if (date === 0) {
   suffix = "st";
 } 
 if (date === 1) {
   suffix = "nd";
 } 
 if (date === 2) {
   suffix = "rd";
 }
 if (date > 3) {
   suffix = "th";
 }
 return suffix;
}

let dateTime = `${days[day]}, ${months[month]} ${date}${getSuffix(date)}, ${year} ${hour}:${minute}`;

let dateDisplay = document.querySelector("#date-time");
dateDisplay.innerHTML = dateTime;

// Sets the city and changes the data

let citySearch = document.querySelector(".city-search");

function cityDisplay(event) {
  event.preventDefault();
  let cityDisplay = document.querySelector("#city-search");
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = cityDisplay.value;
  let apiKey = "6ae49199fbcb90f6780234a44e9b9db4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityDisplay.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(tempDisplay);
}

let cityData = [];

function tempDisplay(response) {
  let temp = response.data.main.temp;
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let temperatureValue = document.querySelector("#temp-display");
  let feelsLike = document.querySelector("#feels");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let min = document.querySelector("#min");
  let max = document.querySelector("#max");

  temperatureValue.innerHTML = `${Math.round(temp)}ºC`;
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}ºC`
  humidity.innerHTML = `${response.data.main.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed}mph`;
  description.innerHTML = `${response.data.weather[0].main}`
  min.innerHTML = `${Math.round(response.data.main.temp_min)}ºC`;
  max.innerHTML = `${Math.round(response.data.main.temp_max)}ºC`;

  // Changes the icon
  let icon = document.querySelector("#icon");
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  // Updates the name of the city
  let currentCity = response.data.name;
  let cityDisplay = document.querySelector("#city-name");
  cityDisplay.innerHTML = currentCity;

  // Creates an array with temperature, latitude and longitude
  cityData = [temp, lat, lon];
  return cityData;
}

function predictionDisplay(response) {
  console.log(response);
}

citySearch.addEventListener("submit", cityDisplay);

// Shows the temperature in the current position

function showCurrentPosition(position) {
  let lat = (position.coords.latitude);
  let lon = (position.coords.longitude);
  let apiKey = "6ae49199fbcb90f6780234a44e9b9db4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(tempDisplay);
}

function showPrediction(event) {
  event.preventDefault;
  let lat = cityData[1];
  let lon = cityData[2];
  let apiKey = "6ae49199fbcb90f6780234a44e9b9db4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current,alerts&units=metric&appid=${apiKey}`
  axios.get(apiUrl).then(predictionDisplay);
}

function callBackFunction() {
  alert("Please, allow the application!");

  let cityDisplay = 'New York';
  let apiKey = "6ae49199fbcb90f6780234a44e9b9db4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityDisplay}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(tempDisplay);
}

navigator.geolocation.getCurrentPosition(showCurrentPosition, callBackFunction);

addEventListener("load", showCurrentPosition);


// Changes unit (FIX!!!)

let celsius = document.querySelector(".temp-celsius");
let fahrenheit = document.querySelector(".temp-fah");

function changeToCelsius() {
  let temperatureValue = document.querySelector("#temp-display");
  temperatureValue.innerHTML = `${Math.round(cityData[0])}ºC`;
} 

function changeToFah() {
  let temperatureValue = document.querySelector("#temp-display");
  temperatureValue.innerHTML = `${Math.round(cityData[0] * 9/5 + 32)}ºF`;

}

celsius.addEventListener("click", changeToCelsius);
fahrenheit.addEventListener("click", changeToFah);





