import { Routes, Route, Navigate } from "react-router-dom";

import { LandingPage } from "./pages/landingPage";
import { NotFoundPage } from "./pages/notFoundPage";
import { RegisterPage } from "./pages/registerPage";
import { LoginPage } from "./pages/loginPage";
import { ProductPage } from "./pages/productPage";
import { ProfilePage } from "./pages/profilePage";
import { useAuthContext } from "./context/authContext";

export default function App() {
  const { authCtx } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={authCtx.isLoggedIn ? <Navigate to="/profile" /> : <LoginPage />} />
      <Route path="/register" element={authCtx.isLoggedIn ? <Navigate to="/profile" /> : <RegisterPage />} />
      <Route path="/profile" element={authCtx.isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />} />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
