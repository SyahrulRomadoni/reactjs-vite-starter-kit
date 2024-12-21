// src/App.jsx

import AppRoutes from './routes';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';

export default function App() {
    return (
        <div className="container-fluid">
            <div className="row" style={{ height: '100vh' }}>
                
                {/* Sidebar */}
                <div className="col-2 p-4" style={{ backgroundColor: 'red' }}>
                    <Sidebar />
                </div>

                {/* Header & Content & Footer*/}
                <div className="col-10 p-3" style={{ backgroundColor: 'blue' }}>

                    {/* Header */}
                    <Header />
                    
                    {/* Content */}
                    <AppRoutes />

                    {/* Footer */}
                    <Footer />
                </div>

            </div>
        </div>
    );
}
