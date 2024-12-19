// src/App.jsx

import AppRoutes from './routes';
import { Link, useNavigate } from "react-router-dom";
import { logout } from "./services/authService";

export default function App() {
    // Import useNavigate
    const navigate = useNavigate();

    // Cek apakah token ada di localStorage
    const token = localStorage.getItem("authToken");

    // Fungsi Logout
    const handleLogout = async () => {
        try {
            // Kirim request logout
            const result = await logout();
            // Menampilkan pesan
            alert(result.message);
            // Hapus token dari localStorage
            localStorage.removeItem("authToken");
            // Arahkan ke halaman login
            navigate("/login");
        } catch (err) {
            alert(err.message || "Something went wrong");
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container">
                    <Link to="/" className="navbar-brand">HOME</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    ><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {!token ? (
                                <>
                                    <li className="nav-item">
                                        <Link to="/login" className="nav-link" aria-current="page">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/register" className="nav-link" aria-current="page">Register</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link to="/dashboard" className="nav-link" aria-current="page">Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/profile" className="nav-link" aria-current="page">Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container mt-5">
                <AppRoutes />
            </div>
        </div>
    );
}
