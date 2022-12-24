import { Routes, Route } from "react-router-dom";

import { LandingPage } from "./pages/landingPage";
import { NotFoundPage } from "./pages/notFoundPage";
import { RegisterPage } from "./pages/registerPage";
import { LoginPage } from "./pages/loginPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
