import { Route, Routes } from "react-router";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/DashboardPages/Home";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import SetNewPasswordPage from "@/pages/SetNewPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import ProtectedRoute from "./ProtectedRoute";
import Member from "@/pages/DashboardPages/Project";
import Users from "@/pages/DashboardPages/MarketingProfile";
import NotFoundPage from "@/pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route index element={<App />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="set-new-password" element={<SetNewPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </Routes>

      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="dashboard" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route index element={<Home />} />
          <Route path="project-table" element={<Member />} />
          <Route path="marketing-profile" element={<Users />} />
        </Route>
      </Routes>
    </>
  )
};
