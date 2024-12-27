// src/views/user/index.jsx

import React, { useEffect, useState } from "react";
import { CurrentUser } from "../../controller/userController";

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
        // return <div>Loading...</div>;
        return;
    }

    return (
        <div>
            <nav aria-label="breadcrumb text-white">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item cs-breadcrumb">TEST</li>
                    <li className="breadcrumb-item cs-breadcrumb">TEST</li>
                    <li className="breadcrumb-item cs-breadcrumb">TEST</li>
                </ol>
            </nav>

            <div className="p-5 mb-4 cs-bg-1 rounded-3 shadow">
                <div className="container-fluid py-5">
                    <h1 className="fw-bold">Profile</h1>
                    <p className="col-md-8">Nama: {userData.data.name}</p>
                    <p className="col-md-8">Email: {userData.data.email}</p>
                </div>
            </div>
        </div>
    );
}
