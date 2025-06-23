import "./CurrentWeather.css";
import { useSkyReport } from "../../context/SkyReportProvider";
import { convertToFahrenheit } from "../../utils/temperatureUtils";

const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const CurrentWeatherCard = ({ data }) => {
  const { unit } = useSkyReport();
  if (!data) {
    return null;
  }

  const { name, sys, main, weather, wind } = data;

  const windSpeed =
    unit === "metric" ? Math.round(wind.speed * 3.6) : Math.round(wind.speed);
  console.log("CurrentWeatherCard data");
  console.log(data);
  return (
    <div className="weather-card">
      <div className="card-header">
        <h2>
          {name}, {sys.country}
        </h2>
        <p className="weather-description">
          {capitalizeFirstLetter(weather[0].description)}
        </p>
      </div>

      <div className="card-body">
        <div className="temperature-container">
          <span className="temperature">
            {unit === "metric"
              ? Math.round(main.temp)
              : Math.round(convertToFahrenheit(main.temp))}
          </span>
          <span className="temperature-unit">
            {unit === "metric" ? "°C" : "°F"}
          </span>
        </div>
        <div className="weather-icon-container">
          <img
            src={`https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
            alt={weather[0].description}
            className="weather-icon"
          />
        </div>
      </div>

      <div className="card-footer">
        <div className="detail-item">
          <span className="label">Humidity</span>
          <span className="value">{main.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="label">Wind Speed</span>
          <span className="value">
            {windSpeed} {unit === "metric" ? "km/h" : "mph"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;
