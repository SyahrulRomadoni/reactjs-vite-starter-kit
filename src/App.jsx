import './assets/css/custome-style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'antd/dist/reset.css';

import { CheckToken } from './middleware/routesMiddleware.jsx';
import { useEffect, useState } from "react";
import { logout } from "./controller/authController";
import { toast } from 'react-hot-toast'

import AppRoutes from './routes';
import Header from './views/Header.jsx';
import SidebarDekstop from './views/SidebarDekstop.jsx';
import SidebarMobile from './views/SidebarMobile.jsx';
import Footer from './views/Footer.jsx';

export default function App() {
    // State untuk menyimpan token
    const [token, setToken] = useState("");
    // State untuk menyimpan mode dark atau light
    const [isDark, setIsDark] = useState(localStorage.getItem("theme-mode") === "dark");

    // Validasi token saat pertama kali load
    useEffect(() => {
        const validasiToken = async () => {
            const response = await CheckToken();
            setToken(response);
        };
        validasiToken();
    }, []);

    // Fungsi Dark Mode dan Light Mode Menggunakan Bootstrap
    useEffect(() => {
        const htmlElement = document.documentElement;
        if (isDark) {
            htmlElement.setAttribute("data-bs-theme", "dark");
        } else {
            htmlElement.setAttribute("data-bs-theme", "light");
        }
    }, [isDark]);

    // Fungsi untuk logout dan menghapus token
    const handleLogout = async () => {
        const result = await logout();
        // alert(result.message);
        toast.success(result.message, {
            duration: 3000,
        })
        localStorage.removeItem("authToken");
        setToken(null);
    };

    return (
        <div className="container-fluid">
            <div className="row" style={{ height: '100vh' }}>
                {token ? (
                    <>
                        {/* Sidebar Dekstop*/}
                        <div className="col-xl-2 col-lg-3 col-md-4 d-sm-block d-none p-4 bg-sidebar shadow">
                            <SidebarDekstop handleLogout={handleLogout} />
                        </div>

                        {/* Sidebar Mobile */}
                        <SidebarMobile handleLogout={handleLogout}/>

                        {/* Header & Content & Footer */}
                        <div className="col-xl-10 col-lg-9 col-md-8 col-sm-12 p-3">
                            {/* Header */}
                            <Header />

                            {/* Content */}
                            <AppRoutes />

                            {/* Footer */}
                            <Footer />
                        </div>
                    </>
                ) : (
                    <>
                        {/* Content jika token tidak ada */}
                        <AppRoutes />
                    </>
                )}
            </div>
        </div>
    );
}
