import { Routes, Route, Navigate } from "react-router-dom";

import { LandingPage } from "./pages/landingPage";
import { NotFoundPage } from "./pages/notFoundPage";
import { RegisterPage } from "./pages/registerPage";
import { LoginPage } from "./pages/loginPage";
import { ProductPage } from "./pages/productPage";
import { ProfilePage } from "./pages/profilePage";
import { DashboardPage } from "./pages/dashboardPage";
import { useAuthContext } from "./context/authContext";

export default function App() {
  const { authCtx } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={authCtx.isLoggedIn ? <Navigate to="/profile" /> : <LoginPage />} />
      <Route path="/register" element={authCtx.isLoggedIn ? <Navigate to="/profile" /> : <RegisterPage />} />
      <Route path="/profile" element={authCtx.isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />} />
      <Route path="/dashboard" element={authCtx.isLoggedIn ? <DashboardPage.UserSummary /> : <Navigate to="/login" />} />
      <Route path="/dashboard/submission" element={authCtx.isLoggedIn ? <DashboardPage.UserSubmission /> : <Navigate to="/login" />} />
      <Route path="/dashboard/saving" element={authCtx.isLoggedIn ? <DashboardPage.UserSaving /> : <Navigate to="/login" />} />
      <Route path="/dashboard/loan" element={authCtx.isLoggedIn ? <DashboardPage.UserLoan /> : <Navigate to="/login" />} />
      <Route path="/dashboard/admin" element={authCtx.isLoggedIn ? <DashboardPage.AdminSummary /> : <Navigate to="/login" />} />
      <Route path="/dashboard/admin/submission" element={authCtx.isLoggedIn ? <DashboardPage.AdminSubmission /> : <Navigate to="/login" />} />
      <Route path="/dashboard/admin/transaction" element={authCtx.isLoggedIn ? <DashboardPage.AdminTransaction /> : <Navigate to="/login" />} />
      <Route path="/dashboard/admin/product" element={authCtx.isLoggedIn ? <DashboardPage.AdminProduct /> : <Navigate to="/login" />} />
      <Route path="/dashboard/admin/user" element={authCtx.isLoggedIn ? <DashboardPage.AdminUser /> : <Navigate to="/login" />} />
      <Route path="/dashboard/teller/transaction" element={authCtx.isLoggedIn ? <DashboardPage.TellerTransaction /> : <Navigate to="/login" />} />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
