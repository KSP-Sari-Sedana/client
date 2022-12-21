import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";

import ToggleProvider from "./context/toggleContext";
import AuthProvider from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="w-10/12 mx-auto">
      <ToggleProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ToggleProvider>
    </div>
  </React.StrictMode>
);
