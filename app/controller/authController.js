// app/services/authController.jsx

import axios from "axios";

const API_URL = import.meta.env.VITE_ENDPOINT || "http://localhost:3001/api";

export const register = async (name, email, password) => {
    try {
        // Static id
        const id_role = 1;

        // Kirim request ke API
        const response = await axios.post(`${API_URL}/auth/register`, { id_role, name, email, password });

        // return response.data
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const login = async (email, password) => {
    try {
        // Kirim request ke API
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        if (response.data.status === "success") {
            // Ambil token dari response.data.data
            const { token } = response.data.data;

            // Simpan token di localStorage
            localStorage.setItem("authToken", token);

            // return response.data
            return response.data;
        } else {
            // return response.data
            return response.data;
        }
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const logout = async () => {
    try {
        // Ambil token dari localStorage
        const token = localStorage.getItem("authToken");

        // Jika token tidak ada, lempar error
        if (!token) throw new Error("No token found");

        // Kirim request ke API
        const response = await axios.post(`${API_URL}/auth/logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Hapus token dari localStorage
        localStorage.removeItem("authToken");

        // return response.data
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
