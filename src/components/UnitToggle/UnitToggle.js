import { useId } from "react";
import "./UnitToggle.css";

const ToggleSwitch = ({ checked, onToggle, label = "Toggle switch" }) => {
  const uniqueId = useId();
  return (
    <div className="toggle-switch-container">
      <label id={uniqueId} className="toggle-label">
        {label}
      </label>
      <button
        className={`toggle-switch ${checked ? "toggled" : ""}`}
        onClick={onToggle}
        role="switch"
        aria-checked={checked}
        aria-labelledby={uniqueId}
      >
        <span className="toggle-thumb" />
      </button>
    </div>
  );
};

export default ToggleSwitch;
