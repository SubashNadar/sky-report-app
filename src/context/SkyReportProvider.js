import React, { createContext, useState, useContext, useEffect } from "react";

const SkyReportContext = createContext();

export const SkyReportProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [unit, setUnit] = useState("metric");
  const [city, setCity] = useState("Hyderabad");
  const countryCode = "IN";

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    } else {
      // Check if user prefers dark mode at system level
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDarkMode);
    }
    const savedUnit = localStorage.getItem("unit");
    if (savedUnit) {
      setUnit(savedUnit);
    } else {
      setUnit("metric");
    }
    const savedCity = localStorage.getItem("city");
    if (savedCity) {
      setCity(savedCity);
    } else {
      setCity("Hyderabad");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  const toggleUnit = () => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);
    localStorage.setItem("unit", newUnit);
  };

  const updateCity = (newCity) => {
    setCity(newCity);
    localStorage.setItem("city", newCity);
  };

  return (
    <SkyReportContext.Provider
      value={{
        darkMode,
        toggleTheme,
        unit,
        toggleUnit,
        city,
        updateCity,
        countryCode,
      }}
    >
      {children}
    </SkyReportContext.Provider>
  );
};

export const useSkyReport = () => useContext(SkyReportContext);
