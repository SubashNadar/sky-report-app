import React, { createContext, useState, useContext, useEffect } from "react";

// Create a context for the SkyReport application
const SkyReportContext = createContext();

export const SkyReportProvider = ({ children }) => {
  // State for dark mode, unit system, and city with default values
  const [darkMode, setDarkMode] = useState(false);
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    try {
      // Load dark mode preference from localStorage or use system preference as fallback
      const storedDarkMode = localStorage.getItem("darkMode");
      setDarkMode(
        storedDarkMode !== null
          ? JSON.parse(storedDarkMode)
          : window.matchMedia &&
              window.matchMedia("(prefers-color-scheme: dark)").matches
      );

      // Load unit preference from localStorage or use metric as default
      const storedUnit = localStorage.getItem("unit");
      setUnit(storedUnit !== null ? storedUnit : "metric");
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []); // Empty dependency array means this runs once on component mount

  // Toggle between light and dark theme
  const toggleTheme = () => {
    try {
      const newMode = !darkMode;
      setDarkMode(newMode);
      localStorage && localStorage.setItem("darkMode", JSON.stringify(newMode));
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  };

  // Toggle between metric and imperial units
  const toggleUnit = () => {
    try {
      const newUnit = unit === "metric" ? "imperial" : "metric";
      setUnit(newUnit);
      localStorage && localStorage.setItem("unit", newUnit);
    } catch (error) {
      console.error("Error saving unit preference:", error);
    }
  };

  // Provide the context values to all child components
  return (
    <SkyReportContext.Provider
      value={{
        darkMode,
        toggleTheme,
        unit,
        toggleUnit,
      }}
    >
      {children}
    </SkyReportContext.Provider>
  );
};

// Custom hook to use the SkyReport context
export const useSkyReport = () => {
  const context = useContext(SkyReportContext);
  return context;
};
