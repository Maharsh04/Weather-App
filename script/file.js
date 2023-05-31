const APIurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const APIkey = "912e64dd7e2d9a4d8ec8f2f30cecc7e0";
const place = document.querySelector(".place");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weatherIcon = document.querySelector(".weather-icon");
const search = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");


async function weather(city) {
    const res = await fetch(APIurl + city + `&appid=${APIkey}`);
    if (res.status == 404) {
        document.querySelector(".error").style.display = "flex";
        document.querySelector(".weather").style.display = "none";
    }
    if (res.status == 400) {
        document.querySelector(".weather").style.display = "none";
        alert("Please enter place name");

    }
    const data = await res.json();
    console.log(data);
    place.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp) + "°C";
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = Math.floor((data.wind.speed * 18) / 5) + " km/h";

    switch (data.weather[0].main) {
        case "Clear":
            weatherIcon.src = "./images/clear.png";
            break;
        case "Clouds":
            weatherIcon.src = "./images/clouds.png";
            break;
        case "Drizzle":
            weatherIcon.src = "./images/drizzle.png";
            break;
        case "Mist":
            weatherIcon.src = "./images/mist.png";
            break;
        case "Rain":
            weatherIcon.src = "./images/rain.png";
            break;
        case "Snow":
            weatherIcon.src = "./images/snow.png";
            break;
    }
    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";

}

searchBtn.addEventListener("click", () => {
    weather(search.value);
    document.querySelector(".weather").style.height = "510px";
});