// src/routes/routesMiddleware.jsx

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL_ENDPOINT || "http://localhost:3001/api";

const RoutesMiddleware = () => {
    // `null` untuk status awal (belum diketahui)
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    // Token tidak ada
                    setIsAuthorized(false);
                    return;
                }

                // Check token ke backend API ada atau tidak
                const response = await axios.post(`${API_URL}/auth/check-token`, { token });
                setIsAuthorized(response.data.status === "success");
            } catch (error) {
                // console.error("Error token : ", error);
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

export default RoutesMiddleware;
