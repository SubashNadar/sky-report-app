import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SkyReportProvider } from "./context/SkyReportProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SkyReportProvider>
      <App />
    </SkyReportProvider>
  </React.StrictMode>
);

reportWebVitals();
