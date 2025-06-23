import { OpenWeatherMap_API_KEY, OpenWeatherMap_BASE_URL } from "./config.js";
const fetchWeatherData = async (endpoint, city, countryCode = null) => {
  if (!city) throw new Error("City parameter is required.");
  if (!countryCode) throw new Error("countryCode parameter is required.");

  let locationQuery = city.trim();
  if (countryCode) {
    locationQuery += `,${countryCode.trim()}`;
  }

  const encodedLocation = encodeURIComponent(locationQuery);

  const response = await fetch(
    `${OpenWeatherMap_BASE_URL}/${endpoint}?q=${encodedLocation}&appid=${OpenWeatherMap_API_KEY}&units=metric`
  );
  console.log(response);
  if (!response.ok) {
    throw new Error(
      `${endpoint === "weather" ? "City" : "Forecast"} not available.`
    );
  }
  const jsonData = await response.json();
  console.log("Here is the final JSON data:", jsonData);
  return jsonData;
};

export const fetchCurrentWeather = (city, countryCode = null) =>
  fetchWeatherData("weather", city, countryCode);
export const fetchForecast = (city, countryCode = null) =>
  fetchWeatherData("forecast", city, countryCode);
