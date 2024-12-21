// src/Header.jsx

export default function Header() {
    return (
        <div className="row mb-3">
            <div className="col-12">

                <div className="p-3 bg-light rounded-3 shadow">
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-6">
                                {/* <h4>Header</h4> */}
                            </div>
                            <div className="col-6">
                                <ul className="nav justify-content-end">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="#">Menu 1</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Menu 2</a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Menu 3</a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Menu 3.1</a></li>
                                            <li><a className="dropdown-item" href="#">Menu 3.2</a></li>
                                            <li><a className="dropdown-item" href="#">Menu 3.3</a></li>
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