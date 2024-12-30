// src/views/auth/login.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../controller/authController";
import { toast } from 'react-hot-toast'

export default function Login() {
    // Gunakan hook useNavigate untuk navigasi
    const navigate = useNavigate();
    // State untuk menyimpan error jika ada dan loading text
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
                return;
            }
        }

        try {
            setLoading(true);
            setError("");
            // Kirim request login
            const result = await login(formData.email, formData.password);
            // Menampilkan pesan
            // alert(result.message);
            toast.success(result.message, {
                duration: 3000,
            });
            // Arahkan ke halaman dashboard
            navigate("/dashboard");
            // Reload halaman untuk merender Sidebar, Header dan Footer
            window.location.reload();
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="row justify-content-end align-items-center" style={{ height: '100vh' }}>
            {/* <div className="col-6 d-flex justify-content-center"></div> */}
            <div className="col-12 d-flex justify-content-center">
                <div className="card" style={{ width: '100%', maxWidth: '40%' }}>
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
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? "Login..." : "Login"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
