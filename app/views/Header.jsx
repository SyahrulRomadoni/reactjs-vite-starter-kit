// app/Header.jsx

export default function Header() {
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
                            {/* Judul header responsif */}
                            <div className="col text-end">
                                <h3 className="mb-0">Header</h3>
                                {/* 
                                <ul className="nav justify-content-end">
                                    <li className="nav-item">
                                        <a className="nav-link cs-text-1" href="#">Menu 1</a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link cs-text-1 dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Menu 2</a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item cs-text-1" href="#">Menu 2.1</a></li>
                                            <li><a className="dropdown-item cs-text-1" href="#">Menu 2.2</a></li>
                                            <li><a className="dropdown-item cs-text-1" href="#">Menu 2.3</a></li>
                                        </ul>
                                    </li>
                                </ul> 
                                */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}