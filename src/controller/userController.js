// src/services/userController.jsx

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL_ENDPOINT || "http://localhost:3001/api";

export const CurrentUser = async () => {
    try {
        // Ambil token dari localStorage
        const token = localStorage.getItem("authToken");
        // Jika token tidak ada, lempar error
        if (!token) throw new Error("No token found");

        // Kirim request ke API
        const response = await axios.get(`${API_URL}/users/current`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Tampilkan data response
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const AllUsers = async (page = 1, limit = 10) => {
    try {
        // Ambil token dari localStorage
        const token = localStorage.getItem("authToken");
        // Jika token tidak ada, lempar error
        if (!token) throw new Error("No token found");

        // Kirim request ke API
        const response = await axios.get(`${API_URL}/users?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Tampilkan data response
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
