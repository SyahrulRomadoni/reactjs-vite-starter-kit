import {
    Navigate,
    Outlet
} from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_ENDPOINT || "http://localhost:3001/api";

// Helper untuk validasi token ke Backend (digunakan di App.jsx)
export const CheckToken = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return null;

    try {
        const response = await axios.post(`${API_URL}/auth/check-token`, { token });
        if (response.data.status === "success") {
            return token;
        } else {
            localStorage.removeItem("authToken");
            return null;
        }
    } catch (error) {
        localStorage.removeItem("authToken");
        return null;
    }
};

// Middleware untuk Tamu (Login/Register)
export const GuestRoutesMiddleware = () => {
    const token = localStorage.getItem("authToken");
    // Jika sudah login, paksa ke dashboard
    return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

// Middleware untuk Admin (Protected)
export const AdminRoutesMiddleware = () => {
    const token = localStorage.getItem("authToken");
    // Jika tidak ada token, paksa ke login
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};