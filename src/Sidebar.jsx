// src/Sidebar.jsx

import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "./controller/authController";

export default function Sidebar() {

    // Switch auto dark kalo kalo theme-mode dark kalo gak dia jadi null = light mode
    const location = useLocation();
    const dark = localStorage.getItem("theme-mode");
    let isDark = false;
    if (dark === "dark") {
        isDark = true;
    } else {
        isDark = false;
    }

    // Import useNavigate
    const navigate = useNavigate();

    // Fungsi Logout
    const handleLogout = async () => {
        try {
            const result = await logout();
            alert(result.message);
            localStorage.removeItem("authToken");
            navigate("/login");
            window.location.reload();
        } catch (err) {
            alert(err.message || "Something went wrong");
        }
    };

    // Fungsi untuk menangani perubahan pada switch
    const handleSwitchChange = () => {
        if (dark === "dark") {
            localStorage.setItem("theme-mode", "light");
        } else {
            localStorage.setItem("theme-mode", "dark");
        }
        window.location.reload();
    };

    return (
        <div>
            <div className="row mb-4">
                <div className="col-12">
                    <h2 className="cs-brand mb-2">Charging Points</h2>
                </div>
                <div className="col-12">
                    <div className="d-flex align-items-center">
                        <i className="bi bi-lightbulb me-3" style={{ fontSize: '20px' }}></i>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                style={{ transform: 'scale(1.3)' }}
                                type="checkbox"
                                role="switch"
                                id="switchModeTheme"
                                checked={isDark}
                                onChange={handleSwitchChange}
                            />
                        </div>
                        <i className="bi bi-lightbulb-off ms-2" style={{ fontSize: '20px' }}></i>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link
                                to="/dashboard"
                                className={`nav-link text-start cs-text-1 m-1 rounded w-100 ${location.pathname === "/dashboard" ? "cs-active" : ""}`}
                                aria-current="page"
                            >
                                <i className="bi bi-speedometer2" style={{paddingRight: "10px"}}></i> Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/profile"
                                className={`nav-link text-start cs-text-1 m-1 rounded w-100 ${location.pathname === "/profile" ? "cs-active" : ""}`}
                                aria-current="page"
                            >
                                <i className="bi bi-person" style={{paddingRight: "10px"}}></i> Profile
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link text-start cs-text-1 m-1 rounded w-100" data-bs-toggle="collapse" href="#dropdown1" role="button" aria-expanded="false" aria-controls="dropdown1">
                             <i className="bi bi-gear" style={{paddingRight: "10px"}}></i> More Action <i className="bi bi-arrow-down-short" style={{ float: 'right'}}></i>
                            </a>
                            <div className="collapse" id="dropdown1" style={{ padding: '10px 10px 10px 30px'}}>
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <a className="nav-link text-start cs-text-1 m-1 rounded w-100" href="#">
                                            <i className="bi bi-arrow-down-circle" style={{paddingRight: "10px"}}></i> Menu 1
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-start cs-text-1 m-1 rounded w-100" href="#">
                                            <i className="bi bi-arrow-down-circle" style={{paddingRight: "10px"}}></i> Menu 2
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link btn btn-link text-start cs-text-1 m-1 rounded w-100" onClick={handleLogout}>
                                <i className="bi bi-door-closed" style={{paddingRight: "10px"}}></i> Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
