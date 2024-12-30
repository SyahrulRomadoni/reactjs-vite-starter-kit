// src/views/dashboard/index.jsx

import React from "react";

export default function Dashboard() {
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item cs-breadcrumb">Dashboard</li>
                    <li className="breadcrumb-item cs-breadcrumb"></li>
                </ol>
            </nav>
            
            <div className="card shadow">
                <div className="card-body">
                    <h1 className="fw-bold">Dashboard</h1>
                    <p className="col-md-8">Welcome to Dashboard</p>
                </div>
            </div>
        </div>
    );
}
