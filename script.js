//Query selectors for form input
const weatherForm = document.querySelector("#weather-search");
const cityInput = document.querySelector("#city-input");
const submit = document.querySelector("#submit");

//Query selectors for displaying result
const resultContainer = document.querySelector(".result-container");
const cityRender = document.querySelector("#city-name");
const resultTemp = document.querySelector("#result");
const resultTempLow = document.querySelector("#result-low");
const resultTempHigh = document.querySelector("#result-high");
const weatherSummary = document.querySelector("#weather");
const resultHumidity = document.querySelector("#humidity");
const resultWindSpeed = document.querySelector("#wind-speed");
const resultIcon = document.querySelector("#icon-render");

const api = "454d05ebd24526c72d0c9bd6862193f6" 

weatherForm.addEventListener("submit", getWeather);

async function getWeather(event) {
    event.preventDefault();
    const city = cityInput.value;
    let units = "";
    let speedUnits = "";
    const toggle = document.querySelector("#temp-switch")
    toggle.addEventListener ("click", checkUnit);
    function checkUnit(){
        if (toggle.checked) {
            units = "metric";
            speedUnits = "kph";
        } else {
            units = "imperial";
            speedUnits = "mph";
        }
    }

    if (city) {
        checkUnit();
        let urlString = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=${units}`;
        const response = await fetch(urlString);
        const data = await response.json();
        const temp = Math.round(data?.main?.temp);
        const cityName = data?.name;

        cityRender.innerText = `${cityName}`

        resultTemp.innerText = `${temp}°`;

        const tempLow = Math.round(data.main.temp_min);
        resultTempLow.innerText = `Low: ${tempLow}°`;

        const tempHigh = Math.round(data.main.temp_max);
        resultTempHigh.innerText = `High: ${tempHigh}°`;

        const humidity = data.main.humidity;
        resultHumidity.innerText = `${humidity}% humidity`;

        const weather = data?.weather[0].description;
        weatherSummary.innerText = `${weather}`;

        const windSpeed = data?.wind?.speed;
        resultWindSpeed.innerText = `${windSpeed} ${speedUnits} winds`;

        const icon = data.weather[0].icon;

        const iconUrl = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}.svg`;
        resultIcon.setAttribute("src", iconUrl);

        const weatherMain = data.weather[0].main;
        console.log(typeof weatherMain);

        // Adds background to result div based on weather condition
        let conditions = {
            "Rain": "url('pexels-pixabay-414659.jpg')", 
            "Thunderstorm":"url('pexels-pixabay-414659.jpg')", 
            "Drizzle": "url('pexels-pixabay-414659.jpg')", 
            "Snow": "url('pexels-eberhard-grossgasteiger-691581.jpg')", 
            "Atmosphere": "url('pexels-chris-f-4997340.jpg')", 
            "Clear": "url('pexels-francesco-ungaro-281260.jpg')", 
            "Clouds": "url('pexels-tim-mossholder-1605148.jpg')"
        };

        let newBackground = conditions[`${weatherMain}`]
        
        resultContainer.style.backgroundImage = newBackground;
       
    } else {
        alert("Please enter a city");
    } 
}



