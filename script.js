const apiKey = `34ed14c6709daf34958313158177d16c`;

async function fetchWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&id=524901&lang=tr&appid=${apiKey}`
    );
    const data = await response.json();
    console.log(data);
    updateWeatherUI(data);

    if (!response.ok) {
      throw new Error("Unable to fetch weather data");
    }
  } catch (error) {
    console.log(error);
  }
}

const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");
const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date");
const descriptionIcon = document.querySelector(".description i");

function updateWeatherUI(data) {
  cityElement.textContent = data.name;
  const temperature0 = (temperature.textContent = `${Math.round(
    data.main.temp
  )} `);
  const temperatureResult = temperature0.slice(0, 2);
  temperature.textContent = `${temperatureResult}°`;
  windSpeed.textContent = `${data.wind.speed} km/h`;
  humidity.textContent = `${data.main.humidity}%`;
  visibility.textContent = `${data.visibility / 1000} km`;
  descriptionText.textContent = data.weather[0].description;
  const weatherIconName = getWeatherIconName(data.weather[0].main);
  descriptionIcon.innerHTML = `<i class="meterial-icons">${weatherIconName}</i>`;

  const currentDate = new Date();
  const turkishFormatter = new Intl.DateTimeFormat("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  date.textContent = turkishFormatter.format(currentDate);
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener("submit", function (e) {
  e.preventDefault();

  const city = inputElement.value;

  if (city !== "") {
    fetchWeatherData(city);
    inputElement.value = "";
  }
});

function getWeatherIconName(weatherCondition) {
  const iconMap = {
    Clear: "wb_sunny",
    Clouds: "wb_cloudy",
    Rain: "umbrella",
    Thunderstorm: "flash_on",
    Drizzle: "grain",
    Snow: "ac_unit",
    Mist: "cloud",
    Smoke: "cloud",
    Haze: "cloud",
    Fog: "cloud",
  };

  return iconMap[weatherCondition] || "help";
}
