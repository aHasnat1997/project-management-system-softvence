import { Route, Routes } from "react-router";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/DashboardPages/Home";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import SetNewPasswordPage from "@/pages/SetNewPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import RegistrationPage from "@/pages/RegistrationPage";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route index element={<App />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="set-new-password" element={<SetNewPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="reg" element={<RegistrationPage />} />
      </Routes>

      <Routes>
        <Route path="dashboard" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<h1>About Content</h1>} />
        </Route>
      </Routes>
    </>
  )
};
