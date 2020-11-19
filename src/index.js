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

let tempValue;

function tempDisplay(response) {
  let temp = response.data.main.temp;
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
    
  let currentCity = response.data.name;
  let cityDisplay = document.querySelector("#city-name");
  cityDisplay.innerHTML = currentCity;

  tempValue = temp;
  return tempValue;
}

citySearch.addEventListener("submit", cityDisplay);

// Shows the temperature in the current position

function showCurrentPosition(position) {
  let lat = (position.coords.latitude);
  let lon = (position.coords.longitude);
  let apiKey = "6ae49199fbcb90f6780234a44e9b9db4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(position);

  axios.get(apiUrl).then(tempDisplay);
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
  temperatureValue.innerHTML = `${Math.round(tempValue)}ºC`;
} 

function changeToFah() {
  let temperatureValue = document.querySelector("#temp-display");
  temperatureValue.innerHTML = `${Math.round(tempValue * 9/5 + 32)}ºF`;

}

celsius.addEventListener("click", changeToCelsius);
fahrenheit.addEventListener("click", changeToFah);




