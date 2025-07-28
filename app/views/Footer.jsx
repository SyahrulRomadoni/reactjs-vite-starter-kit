// app/Header.jsx

export default function Header() {
    const currentYear = new Date().getFullYear();
    return (
        // <div className="row mb-3 fixed-bottom">
        //     <div className="col-10 offset-md-2">
        //            <div style={{ margin: '20px 20px -10px 20px'}}></div>
        <div className="row">
            <div className="col-12">
                <div className="mt-5">
                    <div className="row">
                        <div className="col-12">
                            <p>{currentYear} © Syahrul Romadoni</p>
                        </div>
                        {/* <div className="col-6 text-end">
                            <p>{currentYear} © Syahrul Romadoni</p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}