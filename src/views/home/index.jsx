// src/views/home/index.jsx

import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card shadow text-center w-50">
                    <div className="card-body">
                        <h5 className="fw-bold">REACTJS VITE</h5>
                        <h1 className="fw-bold">Starter Kit</h1>
                        <br />
                        <Link className="btn btn-primary m-1" to="/login" aria-current="page">Login</Link>
                        <Link className="btn btn-secondary m-1" to="/register" aria-current="page">Register</Link>
                    </div>
                </div>
            </div>
        </>
    )
}