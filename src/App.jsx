import './assets/css/custome-style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'antd/dist/reset.css';

import {
    useEffect,
    useState,
    useCallback
} from "react";
import { CheckToken } from './middleware/routesMiddleware.jsx';
import { CurrentUser } from "./controller/userController";
import { logout } from "./controller/authController.js";
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import AppRoutes from './routes/index.jsx';
import Header from './views/Header.jsx';
import SidebarDekstop from './views/SidebarDekstop.jsx';
import SidebarMobile from './views/SidebarMobile.jsx';
import Footer from './views/Footer.jsx';

export default function App() {
    // ====================
    // State
    // ====================
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("authToken"));
    const [user, setUser] = useState(null);
    const [isDark, setIsDark] = useState(localStorage.getItem("theme-mode") === "dark");
    const [isSidebarVisible, setIsSidebarVisible] = useState(localStorage.getItem("sidebar-visible") !== "false");

    // ====================
    // Handler Functions
    // ====================
    // Fungsi sakti untuk update auth tanpa reload
    const updateAuth = useCallback(async () => {
        const currentToken = await CheckToken(); // Validasi ke API
        setToken(currentToken);
        
        if (currentToken) {
            const resUser = await CurrentUser();
            if (resUser.status === "success") {
                setUser(resUser.data);
            }
        } else {
            setUser(null);
        }
    }, []);

    // Logout handler
    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Logout berhasil");
            setToken(null);
            setUser(null);
            navigate("/login");
        } catch (error) {
            toast.error("Logout gagal");
        }
    };

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        const newVisibility = !isSidebarVisible;
        setIsSidebarVisible(newVisibility);
        localStorage.setItem("sidebar-visible", newVisibility);
    };

    // ====================
    // Effects
    // ====================
    // Jalankan sekali saat aplikasi pertama kali dibuka
    useEffect(() => {
        updateAuth();
    }, [updateAuth]);

    // Dark mode logic
    useEffect(() => {
        document.documentElement.setAttribute("data-bs-theme", isDark ? "dark" : "light");
    }, [isDark]);

    return (
        <div className="container-fluid">
            <div
                className="row"
                style={{ height: '100vh', overflow: 'hidden' }}
            >
                {token ? (
                    <>
                        {/* Sidebar */}
                        {isSidebarVisible && (
                            <div
                                className="col-xl-2 col-lg-3 col-md-4 d-md-block d-none p-4 m-2 bg-sidebar shadow"
                                style={{
                                    position: 'fixed',
                                    height: '98vh',
                                    overflowY: 'auto',
                                    borderRadius: '30px 0px 30px 30px',
                                }}
                            >
                                <SidebarDekstop handleLogout={handleLogout} />
                            </div>
                        )}
                        <SidebarMobile handleLogout={handleLogout} />
                        
                        {/* Main Content */}
                        <div
                            className={`col-xl-${isSidebarVisible ? 10 : 12} col-lg-${isSidebarVisible ? 9 : 12} col-md-${isSidebarVisible ? 8 : 12} col-sm-12 ${isSidebarVisible ? 'offset-xl-2 offset-lg-3 offset-md-4' : ''} p-3`}
                            style={{ height: '100vh', overflowY: 'auto' }}
                        >
                            {/* Header */}
                            <Header
                                toggleSidebar={toggleSidebar}
                                isSidebarVisible={isSidebarVisible}
                                user={user}
                                handleLogout={handleLogout}
                            />

                            {/* App Routes */}
                            <AppRoutes
                                user={user}
                                updateAuth={updateAuth}
                            />

                            {/* Footer */}
                            <Footer />
                        </div>
                    </>
                ) : (
                    <>
                        {/* Jika tidak ada token, tampilkan AppRoutes tanpa sidebar dan header */}
                        <div className="col-12">
                            <AppRoutes
                                user={user}
                                updateAuth={updateAuth}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}