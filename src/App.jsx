import './assets/css/custome-style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'antd/dist/reset.css';

import { useEffect, useState } from "react";
import { logout } from "./controller/authController";
import { toast } from 'react-hot-toast'

import AppRoutes from './routes';
import Header from './Header.jsx';
import SidebarDekstop from './SidebarDekstop.jsx';
import SidebarMobile from './SidebarMobile.jsx';
import Footer from './Footer.jsx';

export default function App() {
    // Mengambil token dari localStorage saat pertama kali load
    const [token, setToken] = useState(localStorage.getItem("authToken"));

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
