import {
    AdminRoutesMiddleware,
    GuestRoutesMiddleware
} from '../middleware/routesMiddleware.jsx';
import { Routes, Route } from "react-router-dom";

import Dashboard from "../views/dashboard/index.jsx";
import Home from "../views/home/index.jsx";
import Login from "../views/auth/login.jsx";
import NotFound from "../views/NotFound.jsx";
import Profile from "../views/user/profile.jsx";
import Roles from "../views/role/index.jsx";
import Register from "../views/auth/register.jsx";
import Users from "../views/user/index.jsx";

export default function AppRoutes({
    user,
    updateAuth
}) {
    return (
        <Routes>
            {/* Guest Routes */}
            <Route element={<GuestRoutesMiddleware />}>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login updateAuth={updateAuth} />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<AdminRoutesMiddleware />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile user={user} />} />
                <Route path="/users" element={<Users />} />
                <Route path="/roles" element={<Roles />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}