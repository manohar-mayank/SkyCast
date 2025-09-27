async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherInfo = document.getElementById("weatherInfo");
  const body = document.getElementById("weatherBody"); // For dynamic background

  if (city === "") {
    weatherInfo.innerHTML = "Please enter a city name.";
    return;
  }

  const apiKey = "ab84ec0f5dff724816c60e7ba16f29be"; // Your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    const {
      name,
      sys: { country },
      main: { temp, feels_like, humidity, pressure },
      weather,
      wind: { speed },
    } = data;

    const description = weather[0].description;
    const icon = weather[0].icon;
    const mainWeather = weather[0].main; // e.g., "Clear", "Rain", "Clouds"

    // Update weather info in the container
    weatherInfo.innerHTML = `
      <h2>${name}, ${country}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
      <p><strong>Condition:</strong> ${description}</p>
      <p><strong>Temperature:</strong> ${temp}°C</p>
      <p><strong>Feels Like:</strong> ${feels_like}°C</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Wind Speed:</strong> ${speed} m/s</p>
      <p><strong>Pressure:</strong> ${pressure} hPa</p>
    `;

    // Change background based on weather
    setWeatherBackground(mainWeather, body);

  } catch (error) {
    weatherInfo.innerHTML = "❌ City not found. Please try again.";
  }
}

// Function to set dynamic background
function setWeatherBackground(weather, body) {
  if (weather === "Clear") {
    body.style.backgroundImage = "url('https://img.pikbest.com/wp/202343/clear-sky-clouds-vibrant-summer-a-captivating-background-of-blue-skies-fluffy-and-sunlight_9982034.jpg!sw800')";
  } else if (weather === "Rain") {
    body.style.backgroundImage = "url('https://enlokaantar.prixacdn.net/media/gallery_folder/light-rainfall_0BpL9QtXRm.jpg')";
  } else if (weather === "Clouds") {
    body.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Cloudy_sky_%2826171935906%29.jpg/1200px-Cloudy_sky_%2826171935906%29.jpg')";
  } else if (weather === "Snow") {
    body.style.backgroundImage = "url('https://incompliancemag.com/wp-content/uploads/2023/12/Snowfall.jpg')";
  } else if (weather === "Thunderstorm") {
    body.style.backgroundImage = "url('https://www.timeforkids.com/wp-content/uploads/2018/08/Storms-Images.jpg')";
  } else if (weather === "Drizzle") {
    body.style.backgroundImage = "url('images/drizzle.png')";
  } else if (weather === "Mist" || weather === "Fog") {
    body.style.backgroundImage = "url('https://openweather.co.uk/_next/image?url=%2Fapi%2Fmedia%2Ffile%2Fow_fog_1.jpg&w=3840&q=75')";
  } else {
    body.style.backgroundImage = "url('https://i.ibb.co/8zWjv1k/default.jpg')";
  }
}
