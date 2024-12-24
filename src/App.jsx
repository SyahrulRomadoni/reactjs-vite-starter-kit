import './assets/css/custome-style.css';
import AppRoutes from './routes';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';

export default function App() {
    const token = localStorage.getItem("authToken");

    return (
        <div className="container-fluid">
            <div className="row" style={{ height: '100vh' }}>
                {token ? (
                    <>
                        {/* Sidebar */}
                        <div className="col-2 p-4 bg-sidebar shadow">
                            <Sidebar />
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
