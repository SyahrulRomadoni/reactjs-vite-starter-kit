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
export const BeforeRoutesMiddleware = () => {
    const token = localStorage.getItem("authToken");
    // Jika sudah login, paksa ke dashboard
    return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

// Middleware untuk Admin (Protected)
export const AfterRoutesMiddleware = ({ user, allowedRoles, isLoading }) => {
    const token = localStorage.getItem("authToken");

    // Jika masih loading stop disini
    // Jangan rendet Outlet (isi konten) dulu agar tidak bocor.
    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <div className="spinner-grow" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    // Jika tidak ada token maka lempar ke login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Jika role tidak cocok lembar ke 404
    if (user && !allowedRoles.includes(user.role)) {
        return <Navigate to="/404" replace />;
    }

    // Render content
    return <Outlet />;
};