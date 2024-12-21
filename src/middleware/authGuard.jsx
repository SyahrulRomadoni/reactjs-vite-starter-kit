// src/routes/AuthGuard.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
    // Get token di localStorage
    const authUser = localStorage.getItem("authToken");
    // Jika ada, tampilkan halaman, jika tidak, arahkan ke login
    return authUser ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthGuard;
