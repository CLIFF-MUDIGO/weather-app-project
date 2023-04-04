let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");

//function to fetch weather details from api and to display them
let getWeather = () => {
    let cityValue = cityRef.value;
    //if input field is empty
    if(cityValue.length == 0){
        result.innerHTML = `<h3>please enter a city name</h3>`;
    }
    //if input field is NOT empty
    else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`; 
    fetch(url).then((resp) => resp.json())
    //if city name is valid
    .then(data =>{
        console.log(data);
        console.log(data.weather[0].icon);
        console.log(data.weather[0].main);
        console.log(data.weather[0].description);
        console.log(data.name);
        console.log(data.main.temp_min);
        console.log(data.main.temp_max);
        
        result.innerHTML =






    })
    .catch(() =>{
        result.innerHTML =`<h3>city not found</h3>`;
    })
    }
};
window.addEventListener("load", getWeather);