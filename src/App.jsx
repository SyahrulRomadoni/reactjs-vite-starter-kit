import './assets/css/custome-style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "react-loading-skeleton/dist/skeleton.css";
import 'antd/dist/reset.css';

import {
    useEffect,
    useState,
    useCallback,
    useMemo,
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
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isDark, setIsDark] = useState(localStorage.getItem("theme-mode") === "dark");
    const [isSidebarVisible, setIsSidebarVisible] = useState(localStorage.getItem("sidebar-visible") !== "false");
    const [isLoading, setIsLoading] = useState(true);

    // ====================
    // Handler Functions
    // ====================
    // Fungsi sakti untuk update auth tanpa reload dan isi data user
    const updateAuth = useCallback(async () => {
        const currentToken = await CheckToken();
        if (currentToken) {
            setToken(currentToken);
            const resUser = await CurrentUser();
            if (resUser.status === "success") {
                setUser(resUser.data);
            }
        } else {
            setUser(null);
        }

        setIsLoading(false);
    }, []);

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        const newVisibility = !isSidebarVisible;
        setIsSidebarVisible(newVisibility);
        localStorage.setItem("sidebar-visible", newVisibility);
    };

    // Trigger theme-mode jadi light atau dark pakai switch button
    const handleSwitchChange = () => {
        const newTheme = isDark ? "light" : "dark";
        localStorage.setItem("theme-mode", newTheme);
        setIsDark(!isDark);
    }

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

    // ====================
    // Memoized Initials
    // ====================
    
    // Generate inisial dari email
    // const initials = useMemo(() => {
    //     if (!user?.email) return "?";
    //     const namePart = user.email.split("@")[0];
    //     if (namePart.length === 1) return namePart.toUpperCase();
    //     return (namePart[0] + namePart[namePart.length - 1]).toUpperCase();
    // }, [user]);

    // Generate Inisial dari Name
    const initials = useMemo(() => {
        if (!user?.name) return "?";
        // Bersihkan spasi di awal/akhir dan pecah berdasarkan spasi (regex \s+ jaga-jaga spasi ganda)
        const words = user.name.trim().split(/\s+/);
        // Hanya 1 kata (Contoh: "Kiss")
        if (words.length === 1) {
            return words[0][0].toUpperCase(); // Hasil: "K"
        }
        // 2 kata atau lebih (Contoh: "Kiss Hot" atau "Kiss Hot Next")
        // Kita ambil huruf pertama dari kata PERTAMA dan kata TERAKHIR
        const firstInitial = words[0][0];
        const lastInitial = words[words.length - 1][0];
        return (firstInitial + lastInitial).toUpperCase(); // Hasil: "KH" atau "KN"
    }, [user]);

    // ====================
    // Effects
    // ====================
    // Jalankan sekali saat aplikasi pertama kali dibuka
    useEffect(() => {
        // Update Auth
        updateAuth();

        // Dark mode logic
        document.documentElement.setAttribute("data-bs-theme", isDark ? "dark" : "light");
        const htmlElement = document.documentElement;
        if (isDark) {
            htmlElement.setAttribute("data-bs-theme", "dark");
        } else {
            htmlElement.setAttribute("data-bs-theme", "light");
        }
    }, [
        updateAuth,
        isDark
    ]);

    return (
        <div className="container-fluid">
            <div
                className="row"
                style={{ height: '100vh', overflow: 'hidden' }}
            >
                {/* After Login */}
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
                                    borderRadius: '20px 0px 20px 20px',
                                }}
                            >
                                <SidebarDekstop
                                    user={user}
                                    isDark={isDark}
                                    handleSwitchChange={handleSwitchChange}
                                    handleLogout={handleLogout}
                                />
                            </div>
                        )}
                        <SidebarMobile
                            user={user}
                            isDark={isDark}
                            handleSwitchChange={handleSwitchChange}
                            handleLogout={handleLogout}
                        />
                        
                        {/* Main Content */}
                        <div
                            className={`col-xl-${isSidebarVisible ? 10 : 12} col-lg-${isSidebarVisible ? 9 : 12} col-md-${isSidebarVisible ? 8 : 12} col-sm-12 ${isSidebarVisible ? 'offset-xl-2 offset-lg-3 offset-md-4' : ''} p-3`}
                            style={{ height: '100vh', overflowY: 'auto' }}
                        >
                            {/* Header */}
                            <Header
                                user={user}
                                initials={initials}
                                toggleSidebar={toggleSidebar}
                                isSidebarVisible={isSidebarVisible}
                                handleLogout={handleLogout}
                            />

                            {/* App Routes */}
                            <AppRoutes
                                user={user}
                                initials={initials}
                                updateAuth={updateAuth}
                                isLoading={isLoading}
                            />

                            {/* Footer */}
                            <Footer />
                        </div>
                    </>
                
                // Before Login
                ) : (
                    <>
                        {/* Jika tidak ada token */}
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