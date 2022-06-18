// const video = document.querySelector("#cloud-video");
// video.playbackRate = 0.7;

//Query selectors for form input
const weatherForm = document.querySelector("#weather-search");
const cityInput = document.querySelector("#city");
const submit = document.querySelector("#submit");

//Query selectors for displaying result
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
    let units = ""
    const toggle = document.querySelector("#temp-switch")
    toggle.addEventListener ("click", checkUnit);
    function checkUnit(){
        if (toggle.checked) {
            units = "metric";
        } else {
            units = "imperial";
        }
    }

    if (city) {
        checkUnit();
        let urlString = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=${units}`;
        const response = await fetch(urlString);
        const data = await response.json();
        console.log(toggle);
        const temp = Math.round(data?.main?.temp);
        const cityName = data?.name;
        resultTemp.innerText = `The current temperature in ${cityName} is: ${temp}`;

        const tempLow = Math.round(data.main.temp_min);
        resultTempLow.innerText = `Low: ${tempLow}`;

        const tempHigh = Math.round(data.main.temp_max);
        resultTempHigh.innerText = `High: ${tempHigh}`;

        const humidity = data.main.humidity;
        resultHumidity.innerText = `${humidity}% humidity`;

        const weather = data?.weather[0].description;
        weatherSummary.innerText = `${weather}`;

        const windSpeed = data?.wind?.speed;
        resultWindSpeed.innerText = `${windSpeed} mph`;

        const icon = data.weather[0].icon;

        const iconUrl = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}.svg`;
        resultIcon.setAttribute("src", iconUrl);

    } else {
        alert("Please enter a city");
    }
    

    // weatherForm.reset();  
}

