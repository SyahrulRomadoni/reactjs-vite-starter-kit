// src/services/userController.jsx

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL_ENDPOINT || "http://localhost:3001/api";

export const All = async (page = 1, limit = 100) => {
    try {
        // Ambil token dari localStorage
        const token = localStorage.getItem("authToken");
        // Jika token tidak ada, lempar error
        if (!token) throw new Error("No token found");

        // Kirim request ke API
        const response = await axios.get(
            `${API_URL}/roles?page=${page}&limit=${limit}`,
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
            `${API_URL}/roles`,
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

export const Read = async (uuid) => {
    try {
        // Ambil token dari localStorage
        const token = localStorage.getItem("authToken");
        // Jika token tidak ada, lempar error
        if (!token) throw new Error("No token found");

        // Jika uuid tidak ada, lempar error
        if (!uuid) throw new Error("No uuid found");
        
        // Kirim request ke API
        const response = await axios.get(
            `${API_URL}/roles/${uuid}`,
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

export const Update = async (uuid, name) => {
    try {
        // Ambil token dari localStorage
        const token = localStorage.getItem("authToken");
        // Jika token tidak ada, lempar error
        if (!token) throw new Error("No token found");

        // Jika uuid tidak ada, lempar error
        if (!uuid) throw new Error("No uuid found");

        // Kirim request ke API
        const response = await axios.put(
            `${API_URL}/roles/${uuid}`, 
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

export const Delete = async (uuid) => {
    try {
        // Ambil token dari localStorage
        const token = localStorage.getItem("authToken");
        // Jika token tidak ada, lempar error
        if (!token) throw new Error("No token found");

        // Jika uuid tidak ada, lempar error
        if (!uuid) throw new Error("No uuid found");

        // Kirim request ke API
        const response = await axios.delete(
            `${API_URL}/roles/${uuid}`,
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