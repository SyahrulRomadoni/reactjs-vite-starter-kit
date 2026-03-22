// src/Header.jsx

import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function Header({
    toggleSidebar,
    user,
    handleLogout
}) {
    // ====================
    // Memoized Initials
    // ====================
    // Generate inisial dari email
    const initials = useMemo(() => {
        if (!user?.email) return "?";
        const namePart = user.email.split("@")[0];
        if (namePart.length === 1) return namePart.toUpperCase();
        return (namePart[0] + namePart[namePart.length - 1]).toUpperCase();
    }, [user]);

    return (
        <div className="row mb-3">
            <div className="col-12">
                <div className="card shadow h-100 d-flex justify-content-center align-items-center">
                    <div className="card-body w-100">
                        <div className="row align-items-center">

                            {/* Mobile button */}
                            <div className="col-auto d-block d-md-none">
                                <a
                                    className="btn cs-btn-side-mobile"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasWithBothOptions"
                                >
                                    <i className="bi bi-grid-1x2"></i>
                                </a>
                            </div>

                            {/* Desktop toggle */}
                            <div className="col-auto d-none d-md-block">
                                <a
                                    className="btn cs-btn-side-mobile"
                                    onClick={toggleSidebar}
                                >
                                    <i className="bi bi-grid-1x2"></i>
                                </a>
                            </div>

                            {/* Right section */}
                            <div className="col text-end d-flex justify-content-end align-items-center gap-3">

                                <h3 className="mb-0">Header</h3>

                                {/* Avatar Dropdown */}
                                <div className="dropdown">

                                    <button
                                        className="btn p-0 border-0"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {user?.avatar ? (
                                            <img
                                                src={user.avatar}
                                                alt="avatar"
                                                style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    borderRadius: "50%",
                                                    objectFit: "cover"
                                                }}
                                            />
                                        ) : (
                                            <div
                                                style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    borderRadius: "50%",
                                                    backgroundColor: "#6c757d",
                                                    color: "#fff",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                {initials}
                                            </div>
                                        )}
                                    </button>

                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <Link className="dropdown-item" to="/profile">
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                className="dropdown-item"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}