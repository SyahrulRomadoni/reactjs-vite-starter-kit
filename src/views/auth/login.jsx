// src/views/auth/login.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../../controller/authController";
import { toast } from 'react-hot-toast'

export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Formdata
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Handle perubahan input form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();

        // Validasi individual
        const errorMessages = {
            email: "Email tidak boleh kosong.",
            password: "Password tidak boleh kosong.",
        };
        for (const [key, message] of Object.entries(errorMessages)) {
            if (!formData[key]) {
                setError(message);
                toast.error(message);
                return;
            }
        }

        try {
            setLoading(true);
            setError("");
            const result = await login(formData.email, formData.password);
            toast.success(result.message, {
                duration: 3000,
            });
            navigate("/dashboard");
            window.location.reload();
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
                        <h1 className="fw-bold text-center">Login</h1>
                        <form onSubmit={handleLogin}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="mb-3">
                                <label>Email</label>
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
                                <label>Password</label>
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
                            <div className="row">
                                <div className="col-6">
                                    <Link to="/" aria-current="page" className="btn btn-secondary w-100">Back</Link>
                                </div>
                                <div className="col-6">
                                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                        {loading ? "Login..." : "Login"}
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
