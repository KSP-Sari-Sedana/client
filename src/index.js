import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";

import AuthProvider from "./context/authContext";
import UserProvider from "./context/userContext";
import ProductProvider from "./context/productContext";
import NotifProvider from "./context/notifContext";
import SubmProvider from "./context/submContext";
import HelperProvider from "./context/helperContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="w-10/12 mx-auto">
        <AuthProvider>
          <UserProvider>
            <ProductProvider>
              <NotifProvider>
                <SubmProvider>
                  <HelperProvider>
                    <App />
                  </HelperProvider>
                </SubmProvider>
              </NotifProvider>
            </ProductProvider>
          </UserProvider>
        </AuthProvider>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
