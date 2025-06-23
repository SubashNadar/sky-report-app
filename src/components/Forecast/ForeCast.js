// Example in a Forecast.js component
import React from "react";
import "./ForeCast.css";
import { useSkyReport } from "../../context/SkyReportProvider";
import { convertToFahrenheit } from "../../utils/temperatureUtils";

const Forecast = ({ forecastData }) => {
  const { unit } = useSkyReport();
  if (!forecastData) {
    return null;
  }
  console.log("ForeCast data");
  console.log(forecastData);
  return (
    <div>
      {forecastData && forecastData.list.length > 0 && (
        <div className="forecast-container" style={{ textAlign: "center" }}>
          {forecastData.list.reduce((acc, item, index, array) => {
            const currentDate = item.dt_txt.split(" ")[0];

            if (
              index === 0 ||
              currentDate !== array[index - 1].dt_txt.split(" ")[0]
            ) {
              <br />;
              acc.push(
                <div key={currentDate} className="forecast-day">
                  <h3>
                    {new Date(currentDate).toLocaleDateString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </h3>
                  <div
                    className="forecast-items"
                    style={{
                      display: "flex",
                      overflowX: "auto",
                      textAlign: "center",
                      justifyContent: "center",
                    }}
                  >
                    {array
                      .filter(
                        (forecast) =>
                          forecast.dt_txt.split(" ")[0] === currentDate
                      )
                      .map((forecast) => (
                        <div
                          key={forecast.dt_txt}
                          className="forecast-item"
                          style={{ margin: "0 15px", padding: "10px" }}
                        >
                          <p>{forecast.dt_txt.split(" ")[1]}</p>
                          <img
                            src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                            alt={forecast.weather[0].description}
                          />
                          <p>
                            {unit === "metric"
                              ? Math.round(forecast.main.temp_min)
                              : Math.round(
                                  convertToFahrenheit(forecast.main.temp_min)
                                )}
                            ° /{" "}
                            {unit === "metric"
                              ? Math.round(forecast.main.temp_max)
                              : Math.round(
                                  convertToFahrenheit(forecast.main.temp_max)
                                )}
                            °{unit === "metric" ? "C" : "F"}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              );
            }
            return acc;
          }, [])}
        </div>
      )}
    </div>
  );
};

export default Forecast;
