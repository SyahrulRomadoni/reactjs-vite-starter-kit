// src/Sidebar.jsx

import { Link, useNavigate } from "react-router-dom";
import { logout } from "./controller/authController";

export default function Sidebar() {

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
            <div className="row mb-5">
                <div className="col-6">
                    <h5 className="text-white">Charging Points</h5>
                </div>
                <div className="col-6">
                    <div style={{ float: 'right'}}>
                        <h4 className="text-white">Buttom</h4>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link text-start text-white bg-primary m-1 rounded w-100" href="#">
                                <i className="bi bi-arrow-down-circle"></i> Menu 1
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-start text-white m-1 rounded w-100" href="#">
                                <i className="bi bi-arrow-down-circle"></i> Menu 2
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-start text-white m-1 rounded w-100" href="#">
                                <i className="bi bi-arrow-down-circle"></i> Menu 3
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-start text-white m-1 rounded w-100" href="#">
                                <i className="bi bi-arrow-down-circle"></i> Menu 4
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link text-start text-white m-1 rounded w-100" data-bs-toggle="collapse" href="#menu5" role="button" aria-expanded="false" aria-controls="menu5">
                             <i className="bi bi-arrow-down-circle"></i> Menu 5 <i className="bi bi-arrow-down-circle" style={{ float: 'right'}}></i>
                            </a>
                            <div className="collapse" id="menu5" style={{ padding: '10px 10px 10px 30px'}}>
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <a className="nav-link text-start text-white m-1 rounded w-100" href="#">
                                            <i className="bi bi-arrow-down-circle"></i> Menu 5.1
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-start text-white m-1 rounded w-100" href="#">
                                            <i className="bi bi-arrow-down-circle"></i> Menu 5.2
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-start text-white m-1 rounded w-100" href="#">
                                            <i className="bi bi-arrow-down-circle"></i> Menu 5.3
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-start text-white m-1 rounded w-100" href="#">
                                            <i className="bi bi-arrow-down-circle"></i> Menu 5.4
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link text-start text-white m-1 rounded w-100" onClick={handleLogout}>
                                <i className="bi bi-arrow-down-circle"></i> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}