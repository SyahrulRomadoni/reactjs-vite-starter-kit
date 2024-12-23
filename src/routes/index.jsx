// src/routes/index.jsx

import { Routes, Route } from "react-router-dom";
import { AdminRoutesMiddleware, GuestRoutesMiddleware } from '../middleware/routesMiddleware.jsx';
import Home from "../views/home/index.jsx";
import Register from "../views/auth/register.jsx";
import Login from "../views/auth/login.jsx";
import Dashboard from "../views/dashboard/index.jsx";
import Profile from "../views/user/index.jsx";

export default function AppRoutes() {
    return (
        <Routes>

            {/* Route "/" */}
            <Route path="/" element={<Home />} />

            {/* Menggunakan RoutesMiddleware untuk route yang tidak dilindungi */}
            <Route element={<GuestRoutesMiddleware />}>
                {/* Route "/register" */}
                <Route path="/register" element={<Register />} />
                {/* Route "/login" */}
                <Route path="/login" element={<Login />} />
            </Route>

            {/* Menggunakan RoutesMiddleware untuk route yang dilindungi */}
            <Route element={<AdminRoutesMiddleware />}>
                {/* Route "/dashboard" */}
                <Route path="/dashboard" element={<Dashboard />} />
                {/* Route "/profile" */}
                <Route path="/profile" element={<Profile />} />
            </Route>
            
        </Routes>
    );
}