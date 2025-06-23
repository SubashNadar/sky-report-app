import React from "react";
import { useSkyReport } from "../../context/SkyReportProvider";
import "./DarkModeToggle.css";

const DarkModeToggle = () => {
  const { darkMode, toggleTheme } = useSkyReport();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-button"
      title="Toggle theme"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
};

export default DarkModeToggle;
