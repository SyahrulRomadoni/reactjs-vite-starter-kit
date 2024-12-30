// src/views/auth/register.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../controller/authController";
import { toast } from 'react-hot-toast'

export default function Register() {
    // Gunakan hook useNavigate untuk navigasi
    const navigate = useNavigate();
    // State untuk menyimpan error jika ada dan loading text
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    // Formdata
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // Handle perubahan input form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasi individual
        const errorMessages = {
            name: "Name tidak boleh kosong.",
            email: "Email tidak boleh kosong.",
            password: "Password tidak boleh kosong.",
            confirmPassword: "Konfirmasi password tidak boleh kosong.",
        };
        for (const [key, message] of Object.entries(errorMessages)) {
            if (!formData[key]) {
                setError(message);
                toast.error(message);
                return;
            }
        }

        // Validasi password konfirmasi
        if (formData.password !== formData.confirmPassword) {
            setError("Password and Confirm Password must match");
            toast.error("Password and Confirm Password must match");
            return;
        }

        try {
            setLoading(true);
            setError("");
            // Kirim request login
            const result = await register(formData.name, formData.email, formData.password);
            // Menampilkan pesan
            alert(result.message);
            navigate("/login");
        } catch (err) {
            setError(err.message || "Something went wrong");
            toast.error(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="row justify-content-end align-items-center">
            {/* <div className="col-6 d-flex justify-content-center"></div> */}
            <div className="col-12 d-flex justify-content-center">
                <div className="card shadow">
                    <div className="card-body">
                    <h1 className="fw-bold text-center">Register</h1>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                className="form-control"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
