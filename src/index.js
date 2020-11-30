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

// Gets API from city name's temperature 
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

// Displays the prediction for tomorrow in the current position
function predictionDisplay(response) {
  let tomorrow = document.querySelector("#tomorrow-temp");
  let morning = document.querySelector("#morn");
  let day = document.querySelector("#day");
  let night = document.querySelector("#night");
  let evening = document.querySelector("#eve");

  tomorrow.innerHTML = `${Math.round(response.data.daily[1].temp.day)}ºC`;
  morning.innerHTML = `${Math.round(response.data.daily[1].feels_like.morn)}ºC`
  day.innerHTML = `${Math.round(response.data.daily[1].feels_like.day)}ºC`
  night.innerHTML = `${Math.round(response.data.daily[1].feels_like.night)}ºC`
  evening.innerHTML = `${Math.round(response.data.daily[1].feels_like.eve)}ºC`
}


// Gets the API to the temperature and prediction in the current position
function showCurrentPosition(position) {
  let lat = (position.coords.latitude);
  let lon = (position.coords.longitude);
  let apiKey = "6ae49199fbcb90f6780234a44e9b9db4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(tempDisplay);

  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current,alerts&units=metric&appid=${apiKey}`
  axios.get(apiUrl).then(predictionDisplay);
}

// Shows the data for New York in case the user doesn't allow the application
// ADD PREDICTION API!!!
function callBackFunction() {
  alert("Please, allow the application!");

  let cityDisplay = 'New York';
  let lat = 40.730610;
  let lon = -73.935242;
  let apiKey = "6ae49199fbcb90f6780234a44e9b9db4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityDisplay}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(tempDisplay);

  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current,alerts&units=metric&appid=${apiKey}`
  axios.get(apiUrl).then(predictionDisplay);
}

navigator.geolocation.getCurrentPosition(showCurrentPosition, callBackFunction);



// Changes unit
// ADD the rest of the data (prediction and other data)

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

citySearch.addEventListener("submit", cityDisplay);
addEventListener("load", showCurrentPosition);
celsius.addEventListener("click", changeToCelsius);
fahrenheit.addEventListener("click", changeToFah);





