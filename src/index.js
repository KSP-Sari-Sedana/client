import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";

import ToggleProvider from "./context/toggleContext";
import AuthProvider from "./context/authContext";
import UserProvider from "./context/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="w-10/12 mx-auto">
        <ToggleProvider>
          <AuthProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </AuthProvider>
        </ToggleProvider>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
