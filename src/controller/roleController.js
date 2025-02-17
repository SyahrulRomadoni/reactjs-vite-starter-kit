// src/services/userController.jsx

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL_ENDPOINT || "http://localhost:3001/api";

export const All = async (limit = 100) => {
    try {
        // Ambil token dari localStorage
        const token = localStorage.getItem("authToken");
        // Jika token tidak ada, lempar error
        if (!token) throw new Error("No token found");

        // Kirim request ke API
        const response = await axios.get(
            // `${API_URL}/role?page=${page}&limit=${limit}`,
            `${API_URL}/role?limit=${limit}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Tampilkan data response
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const Create = async (name, email, password) => {
    try {
        // Ambil token dari localStorage
        const token = localStorage.getItem("authToken");
        // Jika token tidak ada, lempar error
        if (!token) throw new Error("No token found");

        // Kirim request ke API
        const response = await axios.post(
            `${API_URL}/role`,
            { name },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const Read = async (id) => {
    try {
        // Ambil token dari localStorage
        const token = localStorage.getItem("authToken");
        // Jika token tidak ada, lempar error
        if (!token) throw new Error("No token found");

        // Jika id tidak ada, lempar error
        if (!id) throw new Error("No id found");
        
        // Kirim request ke API
        const response = await axios.get(
            `${API_URL}/role/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const Update = async (id, name) => {
    try {
        // Ambil token dari localStorage
        const token = localStorage.getItem("authToken");
        // Jika token tidak ada, lempar error
        if (!token) throw new Error("No token found");

        // Jika id tidak ada, lempar error
        if (!id) throw new Error("No id found");

        // Kirim request ke API
        const response = await axios.put(
            `${API_URL}/role/${id}`, 
            { name },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const Delete = async (id) => {
    try {
        // Ambil token dari localStorage
        const token = localStorage.getItem("authToken");
        // Jika token tidak ada, lempar error
        if (!token) throw new Error("No token found");

        // Jika id tidak ada, lempar error
        if (!id) throw new Error("No id found");

        // Kirim request ke API
        const response = await axios.delete(
            `${API_URL}/role/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};