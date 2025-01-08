import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL_ENDPOINT || "http://localhost:3001/api";

export const GuestRoutesMiddleware = () => {
    // Ambil token dari localStorage
    const token = localStorage.getItem("authToken");

    // Jika token ada, arahkan ke halaman dashboard dan kalo gak ada token maka tampilkan halaman login/register/.
    return token ? <Navigate to="/dashboard" /> : <Outlet />;
};

export const AdminRoutesMiddleware = () => {
    // `null` untuk status awal (belum diketahui)
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        const checkToken = async () => {
            try {
                // Ambil token dari localStorage
                const token = localStorage.getItem("authToken");

                // Jika token tidak ada, langsung return false
                if (!token) {
                    // Jika terjadi error, anggap tidak authorized
                    setIsAuthorized(false);
                }

                // Check token ke backend API ada atau tidak
                const response = await axios.post(`${API_URL}/auth/check-token`, { token });
                // console.log("API Response:", response.data);

                // Jika status success, maka authorized true jika tidak, authorized false
                if (response.data.status === "success") {
                    // Jika success, di anggap authorized
                    setIsAuthorized(true);
                } else {
                    // Jika terjadi error, anggap tidak authorized
                    setIsAuthorized(false);

                    // Hapus token dari localStorage
                    localStorage.removeItem("authToken", "");
                }
            } catch (error) {
                // console.error("API Error:", error);

                // Jika terjadi error, anggap tidak authorized
                setIsAuthorized(false);

                // Hapus token dari localStorage
                localStorage.removeItem("authToken", "");
            }
        };

        checkToken();
    }, []);

    // Loading state sebelum otorisasi selesai
    if (isAuthorized === null) {
        // return <div>Loading...</div>;
        return;
    }

    // Jika authorized, tampilkan halaman; jika tidak, arahkan ke login
    return isAuthorized ? <Outlet /> : <Navigate to="/" />;
};
