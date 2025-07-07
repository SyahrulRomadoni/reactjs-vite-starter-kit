// app/Header.jsx

export default function Header() {
    return (
        <div className="row mb-3">
            <div className="col-12">

                <div className="card shadow h-100 d-flex justify-content-center align-items-center">
                    <div className="card-body w-100">
                        <div className="row align-items-center">

                            <div className="col-xxl-0 col-xl-0 col-lg-0 col-md-0 col-sm-3 col-3">
                                <a
                                    style={{ display: "none", float: "left" }}
                                    className="btn cs-btn-side-mobile"
                                    type="button"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasWithBothOptions"
                                    aria-controls="offcanvasWithBothOptions"
                                >
                                    <i className="bi bi-grid-1x2"></i>
                                </a>
                            </div>
                            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-9 col-9">
                                <h3 className="mb-0 text-end">Header</h3>
                                {/* <ul className="nav justify-content-end">
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
                                </ul> */}
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}