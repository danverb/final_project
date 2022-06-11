const weatherForm = document.querySelector("#weather-search");
const cityInput = document.querySelector("#city");
const submit = document.querySelector("#submit");
const resultTemp = document.querySelector("#result");
const resultTempLow = document.querySelector("#result-low");
const resultTempHigh = document.querySelector("#result-high");
const weatherSummary = document.querySelector("#weather");
const resultHumidity = document.querySelector("#humidity");
const resultWindSpeed = document.querySelector("#wind-speed");
const resultWindDirection = document.querySelector("#wind-direction");

const api = "454d05ebd24526c72d0c9bd6862193f6" 

weatherForm.addEventListener("submit", getWeather);

// Toggle Celcius and Farenheit
const celciusButton = document.querySelector("#celcius");
const farenheitButton = document.querySelector("#farenheit");

celciusButton.addEventListener("click", makeCelcius);
function makeCelcius() {
    //change url string to include metric
}

farenheitButton.addEventListener("click", makeFarenheit);
function makeFarenheit() {
    //change url string to include imperial
}


async function getWeather(event) {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        const urlString = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=imperial`;
        const response = await fetch(urlString);
        const data = await response.json();

        const temp = data?.main?.temp;
        resultTemp.innerText = `Temperature is: ${temp}`;

        const tempLow = data.main.temp_min;
        resultTempLow.innerText = `Low: ${tempLow}`;

        const tempHigh = data.main.temp_max;
        resultTempHigh.innerText = `High: ${tempHigh}`;

        const humidity = data.main.humidity;
        resultHumidity.innerText = `${humidity}% humidity`;

        const weather = data?.weather[0];
        weatherSummary.innerText = `${weather}`;

        const windSpeed = data?.wind?.speed;
        resultWindSpeed.innerText = `${windSpeed} mph`;

        const windDirection = data?.wind?.deg;
        resultWindDirection.innerText = `${windDirection} degrees`;
    } else {
        alert("Please enter a city");
    }
    weatherForm.reset();  
}

