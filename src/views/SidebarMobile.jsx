import {
    useEffect,
    useState
} from "react";
import {
    Link,
    useLocation
} from "react-router-dom";

export default function SidebarMobile({
    user,
    isDark,
    handleSwitchChange,
    handleLogout,
}) {
    // ====================
    // State
    // ====================
    // Untuk mengatur lokasi path urlnya
    const location = useLocation();

    return (
        <div
            className="offcanvas offcanvas-start w-75 m-2"
            style={{ borderRadius: '20px' }}
            data-bs-scroll="true"
            tabIndex="-1"
            id="offcanvasWithBothOptions"
            aria-labelledby="offcanvasWithBothOptionsLabel"
        >
            <div className="offcanvas-header">
                <h4 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">ReactJs Vite</h4>
                <button
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <div className="offcanvas-body">

                <div className="row mb-3">
                    {/* <div className="col-12">
                        <h2
                            className="cs-brand mb-2"
                            style={{ fontSize: '25px', marginBottom: '0px' }}
                        >ReactJs Vite</h2>
                    </div> */}
                    <div className="col-12">
                        <div className="d-flex align-items-center">
                            <i className="bi bi-lightbulb cs-icon"></i>
                            <div className="switch-checkbox">
                                <label className="switch">
                                    <input 
                                        type="checkbox" 
                                        onChange={handleSwitchChange} 
                                        checked={isDark} 
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            <i className="bi bi-lightbulb-off cs-icon"></i>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <ul className="nav flex-column">

                            {/* All can use */}
                            <li className="nav-item">
                                <Link
                                    to="/dashboard"
                                    className={`nav-link text-start cs-text-1 m-1 rounded w-100 ${location.pathname === "/dashboard" ? "cs-active" : ""}`}
                                    aria-current="page"
                                >
                                    <i className="bi bi-speedometer2 cs-icon" style={{paddingRight: "10px"}}></i> Dashboard
                                </Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link
                                    to="/profile"
                                    className={`nav-link text-start cs-text-1 m-1 rounded w-100 ${location.pathname === "/profile" ? "cs-active" : ""}`}
                                    aria-current="page"
                                >
                                    <i className="bi bi-person cs-icon" style={{paddingRight: "10px"}}></i> Profile
                                </Link>
                            </li> */}

                            {/* Admin Only */}
                            {user?.role === 'Admin' && (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            to="/users"
                                            className={`nav-link text-start cs-text-1 m-1 rounded w-100 ${location.pathname === "/users" ? "cs-active" : ""}`}
                                            aria-current="page"
                                        >
                                            <i className="bi bi-people cs-icon" style={{paddingRight: "10px"}}></i> User
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to="/roles"
                                            className={`nav-link text-start cs-text-1 m-1 rounded w-100 ${location.pathname === "/roles" ? "cs-active" : ""}`}
                                            aria-current="page"
                                        >
                                            <i className="bi bi-person cs-icon" style={{paddingRight: "10px"}}></i> Role
                                        </Link>
                                    </li>
                                </>
                            )}

                            {/* Sub Menu */}
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link text-start cs-text-1 m-1 rounded w-100"
                                    data-bs-toggle="collapse"
                                    href="#dropdown1"
                                    role="button"
                                    aria-expanded="false"
                                    aria-controls="dropdown1"
                                >
                                    <i
                                        className="bi bi-gear"
                                        style={{paddingRight: "10px"}}
                                    ></i>
                                        More Action
                                    <i
                                        className="bi bi-arrow-down-short"
                                        style={{ float: 'right'}}
                                    ></i>
                                </a>
                                <div
                                    className="collapse" id="dropdown1"
                                    style={{ padding: '10px 10px 10px 30px'}}
                                >
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a
                                                className="nav-link text-start cs-text-1 m-1 rounded w-100"
                                                href="#"
                                            >
                                                <i
                                                    className="bi bi-arrow-down-circle cs-icon"
                                                    style={{paddingRight: "10px"}}
                                                ></i> Menu 1
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link text-start cs-text-1 m-1 rounded w-100"
                                                href="#"
                                            >
                                                <i
                                                    className="bi bi-arrow-down-circle cs-icon"
                                                    style={{paddingRight: "10px"}}
                                                ></i> Menu 2
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            {/* Logout */}
                            {/* <li className="nav-item">
                                <a
                                    className="nav-link btn btn-link text-start cs-text-1 m-1 rounded w-100"
                                    onClick={handleLogout}
                                >
                                    <i
                                        className="bi bi-door-closed cs-icon"
                                        style={{paddingRight: "10px"}}
                                    ></i> Logout
                                </a>
                            </li> */}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
}
