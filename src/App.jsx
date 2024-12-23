// src/App.jsx

import './assets/css/AppLight.css';
// import './assets/css/AppDark.css';
import AppRoutes from './routes';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';
import { useEffect, useState } from 'react';

export default function App() {
    const token = localStorage.getItem("authToken");
    const [theme, setTheme] = useState(localStorage.getItem("theme-mode") || "light");

    // Trigger css Dark/Light mode dari trigger switch
    useEffect(() => {
        if (theme === "dark") {
            import('./assets/css/AppDark.css');
        } else {
            import('./assets/css/AppLight.css');
        }
    }, [theme]);
    const handleThemeSwitch = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        localStorage.setItem("theme-mode", newTheme);
        window.location.reload();
        setTheme(newTheme);
    };

    return (
        <div className="container-fluid">
            <div className="row" style={{ height: '100vh' }}>
                {token ? (
                    <>
                        {/* Sidebar */}
                        <div className="col-2 p-4 bg-sidebar shadow">
                            <Sidebar onThemeSwitch={handleThemeSwitch} />
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
                    </>
                ) : (
                    // Content jika token tidak ada
                    <AppRoutes />
                )}
            </div>
        </div>
    );
}
