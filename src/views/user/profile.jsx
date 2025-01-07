// src/views/user/index.jsx

import React, { useEffect, useState } from "react";
import { CurrentUser } from "../../controller/userController";
import { toast } from 'react-hot-toast';

export default function Profile() {
    const [users, setUsers] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fungsi untuk mengambil data atau tampilan yang mau dirender
    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                setLoading(true);
                const response = await CurrentUser();
                if (response.status === "success") {
                    setUsers(response.data);
                } else {
                    setError(response.message);
                    toast.error(response.message);
                }
            } catch (error) {
                setError(error.message);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        // Panggil fungsi ini untuk data yang mau dirender
        fetchUsersData();
    }, []);

    // Jika ada kendala di UseEffect kalo data user terjadi kendala
    // if (error) {
    //     // Tampilkan error jika ada
    //     return <div>Error: {error}</div>;
    // }

    // Bisa memnbuat animasi loading kalo data masih belum dapat
    // if (!users) {
    //     // Tampilkan loading saat data belum ada
    //     // return <div>Loading...</div>;
    //     return;
    // }

    return (
        <div>
            <nav aria-label="breadcrumb text-white">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item cs-breadcrumb">Profile</li>
                    <li className="breadcrumb-item cs-breadcrumb"></li>
                </ol>
            </nav>

            <div className="card shadow">
                <div className="card-body">
                    <h1 className="fw-bold">Profile</h1>
                    {loading ? (
                        // Bisa di ganti skeleten atau animasi loading
                        <p>Loading...</p>
                    ) : (
                        <>
                            <p className="col-md-8">Nama: {users.name}</p>
                            <p className="col-md-8">Email: {users.email}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
