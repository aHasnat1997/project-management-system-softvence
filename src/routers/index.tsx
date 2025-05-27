import { Route, Routes } from 'react-router';
import App from '../App';
import LoginPage from '../pages/LoginPage';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/DashboardPages/Home';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import SetNewPasswordPage from '@/pages/SetNewPasswordPage';
import ResetPasswordPage from '@/pages/ResetPasswordPage';
import ProtectedRoute from './ProtectedRoute';
import Users from '@/pages/DashboardPages/Users';
import NotFoundPage from '@/pages/NotFoundPage';
import Teams from '@/pages/DashboardPages/Teams';
import Project from '@/pages/DashboardPages/Project';
import CreateProject from '@/pages/DashboardPages/Project/page/CreateProject';
import Members from '@/pages/DashboardPages/Members';

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
                <Route
                    path="dashboard"
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Home />} />
                    <Route path="users" element={<Users />} />
                    <Route path="projects">
                        <Route index element={<Project />} />
                        <Route path="add-project" element={<CreateProject />} />
                    </Route>
                    <Route path="team" element={<Teams />} />
                    <Route path="member" element={<Members />} />
                </Route>
            </Routes>
        </>
    );
}
