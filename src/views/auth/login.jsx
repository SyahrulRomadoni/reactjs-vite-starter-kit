// src/views/auth/login.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

export default function Login() {
    // State untuk menyimpan data email dan password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // State untuk menyimpan error jika ada
    const [error, setError] = useState("");
    // Gunakan hook useNavigate untuk navigasi
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Kirim request login
            const result = await login(email, password);
            // Menampilkan pesan
            alert(result.message);
            // Arahkan ke halaman dashboard
            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Something went wrong");
        }
    };

    return (
        <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">Login</h1>
                <form onSubmit={handleLogin}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
}
