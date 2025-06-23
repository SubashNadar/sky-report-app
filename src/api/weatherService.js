import { OpenWeatherMap_API_KEY, OpenWeatherMap_BASE_URL } from "./config.js";
const fetchWeatherData = async (endpoint, city, countryCode = null) => {
  if (!city) throw new Error("City parameter is required.");

  let locationQuery = city.trim();
  locationQuery += `,${countryCode.trim()}`;

  const encodedLocation = encodeURIComponent(locationQuery);

  const response = await fetch(
    `${OpenWeatherMap_BASE_URL}/${endpoint}?q=${encodedLocation}&appid=${OpenWeatherMap_API_KEY}&units=metric`
  );
  console.log(response);
  if (!response.ok) {
    const errorType = endpoint === "weather" ? "City" : "Forecast";
    throw new Error(
      `${errorType} not available. Status: ${response.status}, Message: ${response.statusText}`
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
