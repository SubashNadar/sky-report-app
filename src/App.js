import "./App.css";
import { useSkyReport } from "./context/SkyReportProvider";
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import CurrentWeatherCard from "./components/CurrentWeather/CurrentWeather";
import { fetchForecast, fetchCurrentWeather } from "./api/weatherService";
import NavBar from "./components/NavBar/NavBar";
import DarkModeToggle from "./components/DarkModeToggle/DarkModeToggle";
import Forecast from "./components/Forecast/ForeCast";
import ToggleSwitch from "./components/UnitToggle/UnitToggle";
import WeatherPreloader from "./components/WeatherPreloader/WeatherPreloader";

function App() {
  const { darkMode, unit, toggleUnit } = useSkyReport();

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

  const handleSearch = async (city, countryCode) => {
    if (!city || !countryCode) {
      setCurrentWeather(null);
      setForecastData(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [weather, forecast] = await Promise.all([
        fetchCurrentWeather(city, countryCode),
        fetchForecast(city, countryCode),
      ]);

      setCurrentWeather(weather);
      setForecastData(forecast);
    } catch (err) {
      setError(err.message);
      setCurrentWeather(null);
      setForecastData(null);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="app-container">
      <NavBar>
        <DarkModeToggle />
      </NavBar>

      <main className="main-content">
        <SearchBar onCitySelect={handleSearch} />
        {loading && <WeatherPreloader />}
        {!loading && currentWeather !== null && (
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              margin: "10px 0",
            }}
          >
            {" "}
            View temperature in °F :
            <ToggleSwitch onToggle={toggleUnit} checked={unit !== "metric"} />
          </p>
        )}
        <div style={{ textAlign: "center", margin: "20px" }}></div>
        {!loading && error && error !== null && error !== "" && (
          <p style={{ textAlign: "center", color: "red" }}>{error}</p>
        )}
        {!loading && currentWeather && (
          <CurrentWeatherCard data={currentWeather} />
        )}

        {!loading && forecastData && <Forecast forecastData={forecastData} />}
      </main>
    </div>
  );
}

export default App;
