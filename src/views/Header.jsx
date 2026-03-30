// src/Header.jsx
import { Link } from "react-router-dom";

export default function Header({
    user,
    initials,
    toggleSidebar,
    handleLogout,
}) {
    return (
        <div className="mb-3">
            <div className="d-flex align-items-center">

                {/* ===== LEFT CARD ===== */}
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
                    <button
                        type="button"
                        className="btn border-0 p-0 d-md-none"
                        style={{ width: "100%", height: "100%", borderRadius: "0px 40px 40px 0px" }}
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasWithBothOptions"
                    >
                        <i className="bi bi-grid-1x2"></i>
                    </button>

                    <button
                        type="button"
                        className="btn border-0 p-0 d-none d-md-block"
                        style={{ width: "100%", height: "100%", borderRadius: "0px 40px 40px 0px" }}
                        onClick={toggleSidebar}
                    >
                        <i className="bi bi-grid-1x2"></i>
                    </button>
                </div>

                {/* ===== RIGHT CARD ===== */}
                <div
                    className="card shadow ms-auto"
                    style={{
                        borderRadius: "40px",
                        height: "60px",
                        width: "auto",
                        zIndex: 1022 // Supaya dropdown tidak tertutup elemen lain
                    }}
                >
                    <div className="card-body d-flex align-items-center justify-content-between px-3 py-2">
                        <h5 className="mb-0 d-block" style={{ paddingRight: "15px", whiteSpace: "nowrap" }}>
                            {user?.name || "-"}
                        </h5>

                        <div className="dropdown">
                            <button
                                className="btn p-0 border-0"
                                data-bs-toggle="dropdown"
                                type="button"
                                style={{ borderRadius: "50%" }}
                            >
                                {user?.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt="avatar"
                                        style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
                                    />
                                ) : (
                                    <div style={{
                                        width: "40px", height: "40px", borderRadius: "50%",
                                        backgroundColor: "#6c757d", color: "#fff",
                                        display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold"
                                    }}>
                                        {initials}
                                    </div>
                                )}
                            </button>

                            <ul 
                                className="dropdown-menu dropdown-menu-end shadow border-0 p-2" 
                                style={{ 
                                    borderRadius: "25px",
                                    marginTop: "15px",
                                    overflow: "hidden"
                                }}
                            >
                                <li>
                                    <Link 
                                        className="dropdown-item py-2" 
                                        to="/profile" 
                                        style={{ borderRadius: "15px" }} // Hover item juga rounded
                                    >
                                        <i className="bi bi-person me-2"></i> Profile
                                    </Link>
                                </li>
                                <li><hr className="dropdown-divider mx-2" /></li>
                                <li>
                                    <button 
                                        className="dropdown-item py-2 text-danger" 
                                        onClick={handleLogout}
                                        style={{ borderRadius: "15px" }} // Hover item juga rounded
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