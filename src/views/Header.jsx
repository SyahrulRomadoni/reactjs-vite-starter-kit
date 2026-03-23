// src/Header.jsx

import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function Header({
    toggleSidebar,
    user,
    handleLogout
}) {
    const initials = useMemo(() => {
        if (!user?.email) return "?";
        const namePart = user.email.split("@")[0];
        if (namePart.length === 1) return namePart.toUpperCase();
        return (namePart[0] + namePart[namePart.length - 1]).toUpperCase();
    }, [user]);

    return (
        <div className="mb-3">

            <div className="d-flex align-items-center">

                {/* ===== LEFT CARD ===== */}
                <div
                    className="card shadow d-flex justify-content-center align-items-center"
                    style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "40px",
                    }}
                >
                    <button
                        type="button"
                        className="btn cs-btn-side-mobile d-block d-md-none"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasWithBothOptions"
                    >
                        <i className="bi bi-grid-1x2"></i>
                    </button>

                    <button
                        type="button"
                        className="btn cs-btn-side-mobile d-none d-md-block"
                        onClick={toggleSidebar}
                    >
                        <i className="bi bi-grid-1x2"></i>
                    </button>
                </div>

                {/* ===== RIGHT CARD (AUTO WIDTH) ===== */}
                <div
                    className="card shadow ms-auto"
                    style={{
                        borderRadius: "40px",
                        width: "auto"
                    }}
                >
                    <div className="card-body d-flex align-items-center gap-3">

                        <h3 className="mb-0">
                            ReactJs Vite
                        </h3>

                        {/* Avatar Dropdown */}
                        <div className="dropdown">
                            <button
                                className="btn p-0 border-0"
                                data-bs-toggle="dropdown"
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

                            <ul className="dropdown-menu dropdown-menu-end" style={{ borderRadius: "20px" }}>
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
    );
}