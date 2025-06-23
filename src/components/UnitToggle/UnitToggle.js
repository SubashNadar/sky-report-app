import React from "react";
import "./UnitToggle.css";

const ToggleSwitch = ({ checked, onToggle, ariaLabel = "Toggle switch" }) => {
  return (
    <button
      className={`toggle-switch ${checked ? "toggled" : ""}`}
      onClick={onToggle}
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
    >
      <span className="toggle-thumb" />
    </button>
  );
};

export default ToggleSwitch;
