// src/Header.jsx

export default function Header() {
    return (
        <div className="row mb-3 fixed-bottom">
            <div className="col-10 offset-md-2">
                <div className="m-2 mb-0">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                    <h4>Text 1</h4>
                                </div>
                                <div className="col-6">
                                    <h4 className="text-end">Text 2</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}