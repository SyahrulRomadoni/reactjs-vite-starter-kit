import './assets/css/custome-style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useEffect, useState } from "react";
import { logout } from "./controller/authController";

import AppRoutes from './routes';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';

export default function App() {
    // Mengambil token dari localStorage saat pertama kali load
    const [token, setToken] = useState(localStorage.getItem("authToken"));

    // Fungsi untuk logout dan menghapus token
    const handleLogout = async () => {
        const result = await logout();
        alert(result.message);
        localStorage.removeItem("authToken");
        setToken(null);
    };

    // Untuk merubah automatis thema yang ada di bawa tapi tidak bisa di trigger
    // Fungsi Dark Mode dan Light Mode Menggunakan Bootstrap
    const [isDark, setIsDark] = useState(localStorage.getItem("theme-mode") === "dark");
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
        <div className="container-fluid">
            <div className="row" style={{ height: '100vh' }}>
                {token ? (
                    <div>
                        {/* Sidebar */}
                        <div className="col-2 p-4 bg-sidebar shadow">
                            <Sidebar handleLogout={handleLogout} />
                        </div>

                        {/* Header & Content & Footer */}
                        <div className="col-10 p-3">
                            {/* Header */}
                            <Header />

                            {/* Content */}
                            <AppRoutes />

                            {/* Footer */}
                            <Footer />
                        </div>
                    </div>
                ) : (
                    <div>
                        {/* Content jika token tidak ada */}
                        <AppRoutes />
                    </div>
                )}
            </div>
        </div>
    );
}
