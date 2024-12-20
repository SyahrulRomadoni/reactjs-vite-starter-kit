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
            <div className="container-fluid">
                <div className="row" style={{ height: '100vh' }}>

                    {/* Sidebar */}
                    <div className="col-2 p-4" style={{ backgroundColor: 'red' }}>
                        <div className="row mb-5">
                            <div className="col-6">
                                <h5>Charging Points</h5>
                            </div>
                            <div className="col-6">
                                <h4>Buttom</h4>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <a className="nav-link text-start text-white bg-primary m-1 rounded w-100" href="#">Menu 1</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-start text-white m-1 rounded w-100" href="#">Menu 2</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-start text-white m-1 rounded w-100" href="#">Menu 3</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-start text-white m-1 rounded w-100" href="#">Menu 4</a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <div class="accordion accordion-flush" id="drowpdownAccordion1">
                                            <div class="accordion-item">
                                                <a class="nav-link text-start text-dark m-1 rounded w-100" type="button" data-bs-toggle="collapse" data-bs-target="#flush-dropdownAccordion1" aria-expanded="false" aria-controls="flush-dropdownAccordion1">
                                                    Menu 5
                                                </a>
                                                <div id="flush-dropdownAccordion1" class="collapse" data-bs-parent="#drowpdownAccordion1" style={{ padding: '10px 10px 10px 10px' }}>
                                                    <ul className="nav flex-column">
                                                        <li className="nav-item">
                                                            <a className="nav-link text-start text-dark m-1 rounded w-100" href="#">Menu 5.1</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link text-start text-dark m-1 rounded w-100" href="#">Menu 5.2</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link text-start text-dark m-1 rounded w-100" href="#">Menu 5.3</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link text-start text-dark m-1 rounded w-100" href="#">Menu 5.4</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link btn btn-link text-start text-white m-1 rounded w-100" onClick={handleLogout}>Logout</button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    {/* Content */}
                    <div className="col-10 p-3" style={{ backgroundColor: 'blue' }}>
                        <AppRoutes />
                    </div>

                </div>
            </div>
        </div>
    );
}
