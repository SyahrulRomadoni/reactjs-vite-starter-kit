// src/views/auth/register.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../controller/authController";
import { toast } from 'react-hot-toast'

export default function Register() {
    // =================================================== Navigate =================================================== //
    // Hook untuk berpindah halaman
    const navigate = useNavigate();

    // =================================================== State =================================================== //
    // State untuk error dan loading
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // State untuk mengatur visibility password dan confirm password
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    
    // Formdata
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // =================================================== Handle =================================================== //
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
            setError("Password dan Confirm Password tidak sama");
            toast.error("Password dan Confirm Password tidak sama");
            return;
        }

        try {
            setLoading(true);
            setError("");
            const result = await register(formData.name, formData.email, formData.password);
            if (result.status === "success") {
                toast.success(result.message, {
                    duration: 3000,
                });
                navigate("/login");
            } else {
                setError(result.message);
                toast.error(result.message);
                setLoading(false);
            }
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
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
                        <div className="mb-3 position-relative">
                            <label>Password</label>
                            <div className="input-group">
                                <input
                                    id="password"
                                    name="password"
                                    type={passwordVisible ? "text" : "password"}
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="btn cs-btn-outline-secondary"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                >
                                    {passwordVisible ? (
                                        <i className="bi bi-eye-slash"></i>
                                    ) : (
                                        <i className="bi bi-eye"></i>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="mb-3 position-relative">
                            <label>Confirm Password</label>
                            <div className="input-group">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={confirmPasswordVisible ? "text" : "password"}
                                    className="form-control"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="btn cs-btn-outline-secondary"
                                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                >
                                    {confirmPasswordVisible ? (
                                        <i className="bi bi-eye-slash"></i>
                                    ) : (
                                        <i className="bi bi-eye"></i>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <Link to="/" aria-current="page" className="btn btn-secondary w-100">Back</Link>
                            </div>
                            <div className="col-6">
                                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                    {loading ? "Registering..." : "Register"}
                                </button>
                            </div>
                        </div> 
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
