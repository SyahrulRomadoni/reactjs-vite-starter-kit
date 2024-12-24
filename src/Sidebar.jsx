import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "./controller/authController";

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    // Fungsi Logout
    const handleLogout = async () => {
        try {
            const result = await logout();
            alert(result.message);
            localStorage.removeItem("authToken");
            navigate("/login");
        } catch (err) {
            alert(err.message || "Something went wrong");
        }
    };

    // Fungsi Dark Mode dan Ligth Mode Menggunakan Bootstrap
    const [isDark, setIsDark] = useState(localStorage.getItem("theme-mode") === "dark");
    // Fungsi untuk menangani perubahan pada switch
    const handleSwitchChange = () => {
        const newTheme = isDark ? "light" : "dark";
        localStorage.setItem("theme-mode", newTheme);
        setIsDark(!isDark);
    };
    // Update 'data-bs-theme' jadi dark atau light
    useEffect(() => {
        const htmlElement = document.documentElement;
        if (isDark) {
            htmlElement.setAttribute("data-bs-theme", "dark");
        } else {
            htmlElement.setAttribute("data-bs-theme", "light");
        }
    }, [isDark]);

    return (
        <div>
            <div className="row mb-4">
                <div className="col-12">
                    <h2 className="cs-brand mb-2" style={{ fontSize: '25px', marginBottom: '0px' }}>Charging Points</h2>
                </div>
                <div className="col-12">
                    <div className="d-flex align-items-center">
                        <i className="bi bi-lightbulb cs-icon"></i>
                        <div className="switch-checkbox">
                            <label className="switch">
                                <input 
                                    type="checkbox" 
                                    onChange={handleSwitchChange} 
                                    checked={isDark} 
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <i className="bi bi-lightbulb-off cs-icon"></i>
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
                                <i className="bi bi-speedometer2 cs-icon" style={{paddingRight: "10px"}}></i> Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/profile"
                                className={`nav-link text-start cs-text-1 m-1 rounded w-100 ${location.pathname === "/profile" ? "cs-active" : ""}`}
                                aria-current="page"
                            >
                                <i className="bi bi-person cs-icon" style={{paddingRight: "10px"}}></i> Profile
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
                                            <i className="bi bi-arrow-down-circle cs-icon" style={{paddingRight: "10px"}}></i> Menu 1
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-start cs-text-1 m-1 rounded w-100" href="#">
                                            <i className="bi bi-arrow-down-circle cs-icon" style={{paddingRight: "10px"}}></i> Menu 2
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link btn btn-link text-start cs-text-1 m-1 rounded w-100" onClick={handleLogout}>
                                <i className="bi bi-door-closed cs-icon" style={{paddingRight: "10px"}}></i> Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
