
let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");
let tempToggleBtn = document.getElementById("temp-toggle-btn");

let currentTempFahrenheit = 0;
let isCelsius = true;

// function to convert Celsius to Fahrenheit
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
  }


// function to convert Fahrenheit to Celsius
function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
  }


// function to display temperature
function displayTemperature(tempCelsius) {
    let temp = isCelsius ? tempCelsius : currentTempFahrenheit;
    let unit = isCelsius ? "&#176;C" : "&#176;F";
    result.querySelector("#temp").innerHTML = `${temp} ${unit}`;
  }








//function to fetch weather details from api and to display them
let getWeather = () => {
    let cityValue = cityRef.value;
    //if input field is empty
    if(cityValue.length == 0){
        result.innerHTML = `<h3 class="msg">please enter a city name</h3>`;
    }
    //if input field is NOT empty
    else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`; 
    //clear the input field
    cityRef.value = "";
    fetch(url).then((resp) => resp.json())
    //if city name is valid
    .then(data =>{
        let weatherDesc = data.weather[0].description;
        let cityName = data.name;
        let weatherIconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        let tempMin = data.main.temp_min;
        let tempMax = data.main.temp_max;
        let currentTemp = data.main.temp;
       
       
        result.innerHTML = `<h2>${cityName}</h2>
                            <h4 class="desc">${weatherDesc}</h4>
                            <img src="${weatherIconUrl}">
                            <h1>${currentTemp} &#176;</h1>
                            <div class="temp-container">
                              <div>
                                <h4 class="title">min</h4>
                                <h4 class="temp">${tempMin}</h4>
                              </div>
                              <div>
                                <h4 class="title">max</h4>
                                <h4 class="temp">${tempMax}</h4>
                              </div>
                            </div>`;
      })
      .catch(() =>{
        result.innerHTML =`<h3 class="msg">City not found</h3>`;
      });
  }

};

searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);



tempToggleBtn.addEventListener("click", () => {
    let currentTempElement = result.querySelector("#temp");
    
    if (isCelsius) {
      currentTempFahrenheit = celsiusToFahrenheit(currentTempFahrenheit);
      currentTempElement.innerHTML = `${currentTempFahrenheit} &#176;F`;
    } else {
      currentTempFahrenheit = fahrenheitToCelsius(currentTempFahrenheit);
      currentTempElement.innerHTML = `${currentTempFahrenheit} &#176;C`;
    }
    
    isCelsius = !isCelsius;
  });