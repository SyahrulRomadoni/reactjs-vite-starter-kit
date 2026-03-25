// src/Header.jsx
import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function Header({
    toggleSidebar,
    user,
    handleLogout
}) {
    // Logic initials user
    const initials = useMemo(() => {
        if (!user?.email) return "?";
        const namePart = user.email.split("@")[0];
        if (namePart.length === 1) return namePart.toUpperCase();
        return (namePart[0] + namePart[namePart.length - 1]).toUpperCase();
    }, [user]);

    return (
        <div className="mb-3">
            <div className="d-flex align-items-center">

                {/* ===== LEFT CARD (SINGLE WRAPPER, DUAL BUTTON) ===== */}
                <div
                    className="card d-flex justify-content-center align-items-center"
                    style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "0px 40px 40px 0px",
                        marginLeft: "-30px",
                        marginTop: "-16px",
                        zIndex: 1021,
                        overflow: "hidden"
                    }}
                >
                    {/* Tombol Khusus Mobile (Muncul hanya di < 768px) */}
                    <button
                        type="button"
                        className="btn border-0 p-0 d-md-none"
                        style={{ width: "100%", height: "100%", borderRadius: "0px 40px 40px 0px" }}
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasWithBothOptions"
                    >
                        <i className="bi bi-grid-1x2"></i>
                    </button>

                    {/* Tombol Khusus Desktop (Muncul hanya di >= 768px) */}
                    <button
                        type="button"
                        className="btn border-0 p-0 d-none d-md-block"
                        style={{ width: "100%", height: "100%", borderRadius: "0px 40px 40px 0px" }}
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
                        height: "60px",
                        width: "auto",
                    }}
                >
                    <div className="card-body d-flex align-items-center justify-content-between px-3 py-2">
                        {/* Judul: d-block memastikan teks TIDAK hilang di mobile maupun desktop */}
                        <h4
                            className="mb-0 d-block" 
                            style={{ paddingRight: "15px", whiteSpace: "nowrap" }}
                        >
                            ReactJs Vite
                        </h4>

                        {/* Avatar Dropdown */}
                        <div className="dropdown">
                            <button
                                className="btn p-0 border-0"
                                data-bs-toggle="dropdown"
                                type="button"
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

                            <ul className="dropdown-menu dropdown-menu-end shadow border-0" style={{ borderRadius: "20px", marginTop: "10px" }}>
                                <li>
                                    <Link className="dropdown-item py-2" to="/profile">
                                        <i className="bi bi-person me-2"></i> Profile
                                    </Link>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <button
                                        className="dropdown-item py-2 text-danger"
                                        onClick={handleLogout}
                                    >
                                        <i className="bi bi-box-arrow-right me-2"></i> Logout
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