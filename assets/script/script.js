// used open weather map api
// API key - a465b826cedf787c3cc1116f8baf5133
// API url - https://home.openweathermap.org

const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

//search click event
search.addEventListener("click", () => {
  const APIKey = "a465b826cedf787c3cc1116f8baf5133";
  const city = document.querySelector(".search-box input").value;

  if (city.trim() === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  ).then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fade-in");
        return;
      }
      error404.style.display = "none";
      error404.classList.remove("fade-in");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(".weather-details .humidity span");
      const wind = document.querySelector(".weather-details .wind span");

      console.log(json.weather[0].main);
      switch (json.weather[0].main) {
        case "Clear":
          image.src = "./assets/images/clear.png";
          break;
        case "Rain":
          image.src = "./assets/images/rain.png";
          break;
        case "Snow":
          image.src = "./assets/images/snow.png";
          break;
        case "Clouds":
          image.src = "./assets/images/cloud.png";
          break;
        case "Mist":
        case "Haze":
          image.src = "./assets/images/mist.png";
          break;
        default:
          image.src = "";
          break;
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fade-in");
      weatherDetails.classList.add("fade-in");
      container.style.height = "590px";
    });

    //easter egg
    console.log("it's always sunny in Philadelphia!");
});
