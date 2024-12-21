// src/Header.jsx

export default function Header() {
    return (
        <div className="row mb-3">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                <h4>Header</h4>
                            </div>
                            <div className="col-6">
                                <ul class="nav justify-content-end">
                                    <li class="nav-item">
                                        <a class="nav-link active" aria-current="page" href="#">Menu 1</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Menu 2</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Menu 3</a>
                                    </li>
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Menu 4</a>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">Menu 4.1</a></li>
                                            <li><a class="dropdown-item" href="#">Menu 4.2</a></li>
                                            <li><a class="dropdown-item" href="#">Menu 4.3</a></li>
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