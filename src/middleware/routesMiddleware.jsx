import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL_ENDPOINT || "http://localhost:3001/api";

export const GuestRoutesMiddleware = () => {
    const token = localStorage.getItem("authToken");

    // Jika token ada, arahkan ke halaman dashboard
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

                // Check token ke backend API ada atau tidak
                const response = await axios.post(`${API_URL}/auth/check-token`, { token });
                // console.log("API Response:", response.data);

                if (response.data.status === "success") {
                    // Simpan token ke localStorage
                    localStorage.setItem("authToken", token);
                
                    // Set authorization state berdasarkan response dari API
                    setIsAuthorized(true);
                } else {
                    // Hapus token dari localStorage
                    localStorage.removeItem("authToken", "");
                
                    // Jika terjadi error, anggap tidak authorized
                    setIsAuthorized(false);
                }
            } catch (error) {
                // Log the error to see what happened
                // console.error("API Error:", error);

                // Hapus token dari localStorage
                localStorage.removeItem("authToken", "");
                
                // Jika terjadi error, anggap tidak authorized
                setIsAuthorized(false);
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
