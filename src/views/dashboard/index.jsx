// src/views/dashboard/index.jsx

import React from "react";

export default function Dashboard() {
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item cs-breadcrumb">TEST</li>
                    <li className="breadcrumb-item cs-breadcrumb">TEST</li>
                    <li className="breadcrumb-item cs-breadcrumb">TEST</li>
                </ol>
            </nav>
            
            <div className="p-5 mb-4 cs-bg-1 rounded-3 shadow">
                <div className="container-fluid py-5">
                    <h1 className="fw-bold cs-text">HALAMAN DASHBOARD</h1>
                    <p className="col-md-8 cs-text">Dashboard</p>
                </div>
            </div>
        </div>
    );
}
