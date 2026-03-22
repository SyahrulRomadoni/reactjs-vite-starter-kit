import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../controller/authController";
import { Link } from "react-router-dom";
import { toast } from 'react-hot-toast'

export default function Login({
    updateAuth
}) {
    // =====================
    // State
    // =====================
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    // =====================
    // Handler Functions
    // =====================
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            const result = await login(formData.email, formData.password);
            if (result.status === "success") {
                toast.success(result.message);
                await updateAuth(); 
                navigate("/dashboard");
            } else {
                setError(result.message);
                toast.error(result.message);
            }
        } catch (err) {
            setError(err.message || "Something went wrong");
            toast.error(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ minHeight: '100vh' }}
        >
            <div
                className="card shadow p-4"
                style={{ width: '400px' }}
            >
                <h1 className="fw-bold text-center mb-4">Login</h1>
                <form onSubmit={handleLogin}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            name="email" type="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="input-group">
                            <input
                                name="password"
                                type={passwordVisible ? "text" : "password"}
                                className="form-control" value={formData.password}
                                onChange={handleChange} required
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                            >
                                {passwordVisible ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                            </button>
                        </div>
                    </div>
                    <div className="row g-2">
                        <div className="col-6">
                            <Link to="/" className="btn btn-secondary w-100">Back</Link>
                        </div>
                        <div className="col-6">
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Login"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}