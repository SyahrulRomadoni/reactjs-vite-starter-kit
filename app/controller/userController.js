// app/services/userController.jsx

import axios from "axios";

const API_URL = import.meta.env.VITE_ENDPOINT || "http://localhost:3001/api";

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

        // Static id_role
        // const id_role = "108f8d4f-cbda-4f1f-8216-a3dd764c5e5d";
        const id_role = role;

        // Kirim request ke API
        const response = await axios.post(
            `${API_URL}/user`,
            { id_role, name, email, password },
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
            `${API_URL}/user/${id}`,
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

export const Update = async (id, role, name, email, password) => {
    try {
        // Ambil token dari localStorage
        const token = localStorage.getItem("authToken");
        // Jika token tidak ada, lempar error
        if (!token) throw new Error("No token found");

        // Jika id tidak ada, lempar error
        if (!id) throw new Error("No id found");
        // Static id_role
        // const id_role = "108f8d4f-cbda-4f1f-8216-a3dd764c5e5d";
        const id_role = role;

        // Kirim request ke API
        const response = await axios.put(
            `${API_URL}/user/${id}`, 
            { id_role, name, email, password },
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
            `${API_URL}/user/${id}`,
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