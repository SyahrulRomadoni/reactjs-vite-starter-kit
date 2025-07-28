// app/Header.jsx

export default function Header({ toggleSidebar, isSidebarVisible }) {
    return (
        <div className="row mb-3">
            <div className="col-12">
                <div className="card shadow h-100 d-flex justify-content-center align-items-center">
                    <div className="card-body w-100">
                        <div className="row align-items-center">
                            {/* Button tampil di mobile, sembunyi di desktop */}
                            <div className="col-auto d-block d-md-none">
                                <a
                                    className="btn cs-btn-side-mobile"
                                    type="button"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasWithBothOptions"
                                    aria-controls="offcanvasWithBothOptions"
                                >
                                    <i className="bi bi-grid-1x2"></i>
                                </a>
                            </div>
                            {/* Tombol hide/show sidebar, sembunyi di mobile */}
                            <div className="col-auto d-none d-md-block">
                                <a
                                    className="btn cs-btn-side-mobile"
                                    type="button"
                                    onClick={toggleSidebar}
                                >
                                    <i className="bi bi-grid-1x2"></i>
                                </a>
                            </div>
                            {/* Judul header responsif */}
                            <div className="col text-end">
                                <h3 className="mb-0">Header</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}