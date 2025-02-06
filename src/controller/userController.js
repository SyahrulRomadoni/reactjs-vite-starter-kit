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
        const response = await axios.get(
            `${API_URL}/user/current`,
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

export const All = async (limit = 100) => {
    try {
        // Ambil token dari localStorage
        const token = localStorage.getItem("authToken");
        // Jika token tidak ada, lempar error
        if (!token) throw new Error("No token found");

        // Kirim request ke API
        const response = await axios.get(
            // `${API_URL}/user?page=${page}&limit=${limit}`,
            `${API_URL}/user?limit=${limit}`,
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

export const Create = async (role, name, email, password) => {
    try {
        // Ambil token dari localStorage
        const token = localStorage.getItem("authToken");
        // Jika token tidak ada, lempar error
        if (!token) throw new Error("No token found");

        // Static uuid_role
        // const uuid_role = "108f8d4f-cbda-4f1f-8216-a3dd764c5e5d";
        const uuid_role = role;

        // Kirim request ke API
        const response = await axios.post(
            `${API_URL}/user`,
            { uuid_role, name, email, password },
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
            `${API_URL}/user/${uuid}`,
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

export const Update = async (uuid, role, name, email, password) => {
    try {
        // Ambil token dari localStorage
        const token = localStorage.getItem("authToken");
        // Jika token tidak ada, lempar error
        if (!token) throw new Error("No token found");

        // Jika uuid tidak ada, lempar error
        if (!uuid) throw new Error("No uuid found");
        // Static uuid_role
        // const uuid_role = "108f8d4f-cbda-4f1f-8216-a3dd764c5e5d";
        const uuid_role = role;

        // Kirim request ke API
        const response = await axios.put(
            `${API_URL}/user/${uuid}`, 
            { uuid_role, name, email, password },
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
            `${API_URL}/user/${uuid}`,
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