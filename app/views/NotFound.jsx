import { Link } from "react-router-dom";
import React from "react";

const NotFound = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", textAlign: "center" }}>
            <div>
                <h1>404</h1>
                <h1>Page Not Found</h1>
                <p>Sorry, the page you are looking for does not exist.</p>
                <Link to="/" aria-current="page" className="btn btn-secondary w-100">Back to Main</Link>
            </div>
        </div>
    );
};

export default NotFound;
