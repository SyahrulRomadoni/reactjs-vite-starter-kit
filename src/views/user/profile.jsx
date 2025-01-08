// src/views/user/index.jsx

import React, { useEffect, useState } from "react";
import { CurrentUser } from "../../controller/userController";
import { toast } from 'react-hot-toast';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Profile() {
    // State untuk data user
    const [users, setUsers] = useState(null);
    
    // State untuk loading dan error
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch data untuk load data pertama kali
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
                        <Skeleton height={20} count={2} />
                    ) : error ? (
                        <h3 className="text-danger text-center p-5">{error}</h3>
                    ) : (
                        <>
                            <p className="col-md-8">Nama: {users?.name || "xxxxxxxxxxxxx"}</p>
                            <p className="col-md-8">Email: {users?.email || "xxxxxxxxxxxxx"}</p>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}
