// src/routes/index.jsx

import { Routes, Route } from "react-router-dom";
import AuthGuard from '../middleware/AuthGuard.jsx';
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
            {/* Route "/register" */}
            <Route path="/register" element={<Register />} />
            {/* Route "/login" */}
            <Route path="/login" element={<Login />} />

            {/* Menggunakan AuthGuard untuk route yang dilindungi */}
            <Route element={<AuthGuard />}>
                {/* Route "/dashboard" */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
            
        </Routes>
    );
}
