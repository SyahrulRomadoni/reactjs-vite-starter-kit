// src/Header.jsx

export default function Header() {
    return (
        <div className="row mb-3">
            <div className="col-12">

                <div className="card shadow">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                {/* <h4>Header</h4> */}
                            </div>
                            <div className="col-6">
                                <ul className="nav justify-content-end">
                                    <li className="nav-item">
                                        <a className="nav-link cs-text-1" href="#">Menu 1</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link cs-text-1" href="#">Menu 2</a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link cs-text-1 dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Menu 3</a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item cs-text-1" href="#">Menu 3.1</a></li>
                                            <li><a className="dropdown-item cs-text-1" href="#">Menu 3.2</a></li>
                                            <li><a className="dropdown-item cs-text-1" href="#">Menu 3.3</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}