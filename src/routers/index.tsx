import { Route, Routes } from "react-router";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/DashboardPages/Home";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route index element={<App />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>

      <Routes>
        <Route path="dashboard" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<h1>About Content</h1>} />
        </Route>
      </Routes>
    </>
  )
}