import { useState, useEffect, Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Logo } from "./components/interface/Logo";
import { Spinner } from "./components/interface/Spinner";
import { Badge } from "./components/interface/Badge";
import { StarIcon } from "./components/icons/StarIcon";
import { LandingPage } from "./pages/landingPage";
import { NotFoundPage } from "./pages/notFoundPage";
import { RegisterPage } from "./pages/registerPage";
import { LoginPage } from "./pages/loginPage";
import { ProductPage } from "./pages/productPage";
import { ProfilePage } from "./pages/profilePage";
import { DashboardPage } from "./pages/dashboardPage";
import { RestrictPage } from "./pages/restrictPage";
import { useAuthContext } from "./context/authContext";
import { useUserContext } from "./context/userContext";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { authCtx } = useAuthContext();
  const { userCtx } = useUserContext();

  useEffect(() => {
    getIsLoggedIn();
  }, []);

  async function getIsLoggedIn() {
    setIsLoggedIn(await authCtx.getIsLoggedIn());
    setIsLoading(false);
  }

  return (
    <div>
      {isLoading ? (
        <div>
          <div className="flex items-center justify-center h-screen">
            <div>
              <Logo />
              <Spinner text="Loading" className="text-slate-700 place-content-center mt-3" />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={isLoggedIn ? <Navigate to="/profile" /> : <LoginPage />} />
            <Route path="/register" element={isLoggedIn ? <Navigate to="/profile" /> : <RegisterPage />} />
            <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />} />
            <Route path="/products/:id" element={<ProductPage />} />
            {userCtx?.me?.role === "Member" ? (
              <Route
                path="/dashboard"
                element={
                  <RestrictPage>
                    <div>
                      <p>Lengkapi profil dan lakukan pembayaran</p>
                      <p>modal di koperasi untuk mengakses dashboard</p>
                    </div>
                    <div className="flex mt-3 gap-x-2 place-content-center">
                      <Badge style="clear">
                        <StarIcon role={userCtx.me.role} />
                        {userCtx.me.role}
                      </Badge>
                      <Badge
                        style={
                          userCtx.me.status === "Aktif"
                            ? "clear"
                            : userCtx.me.status === "Ditinjau"
                            ? "buttercup"
                            : userCtx.me.status === "Dikunci"
                            ? "rice"
                            : userCtx.mestatus === "Nonaktif"
                            ? "magenta"
                            : "pippin"
                        }
                      >
                        {userCtx.me.status}
                      </Badge>
                    </div>
                  </RestrictPage>
                }
              />
            ) : (
              <Fragment>
                <Route path="/dashboard" element={isLoggedIn ? <DashboardPage.MemberSummary /> : <Navigate to="/login" />} />
                <Route path="/dashboard/submission" element={isLoggedIn ? <DashboardPage.MemberSubmission /> : <Navigate to="/login" />} />
                <Route path="/dashboard/submission/:type/:id" element={isLoggedIn ? <DashboardPage.MemberSubmissionDetail /> : <Navigate to="/login" />} />
                <Route path="/dashboard/saving" element={isLoggedIn ? <DashboardPage.MemberSaving /> : <Navigate to="/login" />} />
                <Route path="/dashboard/saving/:id" element={isLoggedIn ? <DashboardPage.MemberSavingDetail /> : <Navigate to="/login" />} />
                <Route path="/dashboard/loan" element={isLoggedIn ? <DashboardPage.MemberLoan /> : <Navigate to="/login" />} />
                <Route path="/dashboard/loan/:id" element={isLoggedIn ? <DashboardPage.MemberLoanDetail /> : <Navigate to="/login" />} />
                <Route path="/dashboard/admin" element={isLoggedIn ? <DashboardPage.AdminSummary /> : <Navigate to="/login" />} />
                <Route path="/dashboard/admin/submission" element={isLoggedIn ? <DashboardPage.AdminSubmission /> : <Navigate to="/login" />} />
                <Route path="/dashboard/admin/submission/:type/:id" element={isLoggedIn ? <DashboardPage.AdminSubmissionDetail /> : <Navigate to="/login" />} />
                <Route path="/dashboard/admin/transaction" element={isLoggedIn ? <DashboardPage.AdminTransaction /> : <Navigate to="/login" />} />
                <Route path="/dashboard/admin/product" element={isLoggedIn ? <DashboardPage.AdminProduct /> : <Navigate to="/login" />} />
                <Route path="/dashboard/admin/product/:id" element={isLoggedIn ? <DashboardPage.AdminProductDetail /> : <Navigate to="/login" />} />
                <Route path="/dashboard/admin/user" element={isLoggedIn ? <DashboardPage.AdminUser /> : <Navigate to="/login" />} />
                <Route path="/dashboard/admin/user/:username" element={isLoggedIn ? <DashboardPage.AdminUserDetail /> : <Navigate to="/login" />} />
                <Route path="/dashboard/teller/transaction" element={isLoggedIn ? <DashboardPage.TellerTransaction /> : <Navigate to="/login" />} />
              </Fragment>
            )}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      )}
    </div>
  );
}
