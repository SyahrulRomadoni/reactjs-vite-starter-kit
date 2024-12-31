// src/views/home/index.jsx

import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <div className="card shadow mt-3">
                <div className="card-body">
                    <h1 className="fw-bold">REACT JS</h1>
                    <p className="mb-0">HOME</p>
                    <Link to="/login" aria-current="page">Login</Link>
                    <br />
                    <Link to="/register" aria-current="page">Register</Link>
                </div>
            </div>
        </div>
    )
}