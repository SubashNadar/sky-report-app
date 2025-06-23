import React from "react";
import "./WeatherPreloader.css";

const WeatherPreloader = () => {
  return (
    <div className="preloader-container">
      <div className="preloader-content">
        <div className="weather-icon-group">
          <div className="sun"></div>
          <div className="cloud">
            <div className="rain">
              <span className="drop"></span>
              <span className="drop"></span>
              <span className="drop"></span>
              <span className="drop"></span>
              <span className="drop"></span>
            </div>
          </div>
        </div>
        <p className="loading-text">Searching sky report...</p>
      </div>
    </div>
  );
};

export default WeatherPreloader;
