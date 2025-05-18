import { Route, Routes } from "react-router";
import App from "../App";
import LoginPage from "../pages/LoginPage";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route index element={<App />} />
      </Routes>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      <Routes>
        <Route path="/dashboard" element={<><h1 className="text-4xl font-bold">Dashboard Page</h1></>} />
      </Routes>
    </>
  )
}