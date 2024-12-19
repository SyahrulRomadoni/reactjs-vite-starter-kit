// src/views/user/index.jsx

import React, { useEffect, useState } from "react";
import { CurrentUser } from "../../services/userService";

export default function Profile() {
    // State untuk menyimpan data user
    const [userData, setUserData] = useState(null);
    // State untuk menyimpan error jika ada
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Panggil API
                const data = await CurrentUser();
                // Simpan data ke state
                setUserData(data);
            } catch (err) {
                setError(err.message || "Failed to fetch user data.");
            }
        };

        // Panggil fungsi saat komponen dirender
        fetchUserData();
    }, []);

    if (error) {
        // Tampilkan error jika ada
        return <div>Error: {error}</div>;
    }

    if (!userData) {
        // Tampilkan loading saat data belum ada
        return <div>Loading...</div>;
    }

    return (
        <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">Profile</h1>
                <p className="col-md-8 fs-4">Nama: {userData.data.name}</p>
                <p className="col-md-8 fs-4">Email: {userData.data.email}</p>
            </div>
        </div>
    );
}
