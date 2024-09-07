function refreshWeather(response){
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  timeElement.innerHTML = formatDate(date);
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  descriptionElement.innerHTML= response.data.condition.description;
    cityElement.innerHTML = response.data.city;
    
  temperatureElement.innerHTML = `${Math.round(temperature)}°C`;  
}

function formatDate (date){
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday', 'Saturday'];
  let day = days[date.getDay()];

if (minutes < 10){
  minutes = `0${minutes}`;
}

  return `${day} ${hours}:${minutes},`;
}

function searchCity (city){
    let apiKey = "e3b3095tf9493f408498of3c2e1c6a18"
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit (event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
   
    searchCity(searchInput.value);

}
let searchFormElement=document.querySelector("#search-form");
searchFormElement.addEventListener("submit",handleSearchSubmit);

searchCity("Johannesburg");