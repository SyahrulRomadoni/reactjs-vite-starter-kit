import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Offcanvas } from "bootstrap";

export default function Header({
    toggleSidebar,
    user,
    handleLogout,
    isSidebarVisible
}) {
    // ====================
    // Initials
    // ====================
    const initials = useMemo(() => {
        if (!user?.email) return "?";

        const namePart = user.email.split("@")[0];

        if (namePart.length === 1) {
            return namePart.toUpperCase();
        }

        return (
            namePart[0] + namePart[namePart.length - 1]
        ).toUpperCase();
    }, [user]);

    // ====================
    // Handler
    // ====================
    const handleSidebarClick = () => {
        if (window.innerWidth < 768) {
            const offcanvasEl = document.getElementById("offcanvasWithBothOptions");

            if (offcanvasEl) {
                const bsOffcanvas = Offcanvas.getOrCreateInstance(offcanvasEl);
                bsOffcanvas.show();
            }
        } else {
            toggleSidebar();
        }
    };

    return (
        <div className="mb-3">
            <div className="d-flex align-items-center">

                {/* ===== LEFT BUTTON ===== */}
                <div
                    className="card d-flex justify-content-center align-items-center"
                    style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "0px 30px 30px 0px",
                        marginLeft: "-30px",
                        marginTop: "-26px",
                    }}
                >
                    <a
                        href="#"
                        type="button"
                        className="cs-btn-side-mobile cs-text-1"
                        onClick={(e) => {
                            e.preventDefault();
                            handleSidebarClick();
                        }}
                    >
                        <i className="bi bi-grid-1x2"></i>
                    </a>
                </div>

                {/* ===== RIGHT CARD ===== */}
                <div
                    className="card shadow ms-auto"
                    style={{
                        borderRadius: "30px",
                        height: "60px",
                        width: "auto",
                    }}
                >
                    <div className="card-body d-flex align-items-center justify-content-between px-3 py-2">
                        <h4
                            className="mb-0"
                            style={{ paddingRight: 10 }}
                        >
                            ReactJs Vite
                        </h4>

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