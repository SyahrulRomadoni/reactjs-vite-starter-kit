// src/views/user/index.jsx

import "react-loading-skeleton/dist/skeleton.css";
import {
    useEffect,
    useState
} from "react";
import {
    Table,
    Button,
    Input
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { toast } from 'react-hot-toast';
import Skeleton from "react-loading-skeleton";
import Select from 'react-select';

// Controller
import * as userController from "../../controller/userController";
import * as roleController from "../../controller/roleController";

export default function Index() {
    // ====================
    // State
    // ====================
    // state untuk menyimpan data users dan data roles
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);

    // state untuk error dan errorFetch
    const [error, setError] = useState("");
    const [errorFetch, setErrorFetch] = useState("");

    // state untuk loading
    const [loading, setLoading] = useState(true);

    // state untuk modal
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedData, setSelectedData] = useState(null);

    // state untuk table
    const [searchData, setSearchData] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    // state untuk form data
    const [formData, setFormData] = useState({
        role: null,
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // State untuk mengatur password dan confirm password
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    // ====================
    // Handler
    // ====================
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Modal Control
    const openCreateModal = () => {
        setModalType('create');
        setShowModal(true);
        setFormData({
            role: null,
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    const openReadModal = async (uuid) => {
        setModalType('read');
        setSelectedData(uuid);
        setShowModal(true);

        try {
            const response = await userController.Read(uuid);
            const userData = response.data;

            // Set data form
            setFormData({
                role: userData.uuid_role || null,
                name: userData.name || '',
                email: userData.email || '',
                password: ''
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const openUpdateModal = async (uuid) => {
        setModalType('update');
        setSelectedData(uuid);
        setShowModal(true);

        try {
            const response = await userController.Read(uuid);
            const userData = response.data;

            // Set data form
            setFormData({
                role: userData.uuid_role || null,
                name: userData.name || '',
                email: userData.email || '',
                password: ''
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const openDeleteModal = (uuid) => {
        setModalType('delete');
        setSelectedData(uuid);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedData(null);
        setFormData({
            role: null,
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
        setError("");
    };

    // CRUDS
    const handleCreate = async (e) => {
        e.preventDefault();

        // Validasi individual
        const errorMessages = {
            role: "Role tidak boleh kosong.",
            name: "Name tidak boleh kosong.",
            email: "Email tidak boleh kosong.",
            password: "Password tidak boleh kosong.",
        };
        for (const [key, message] of Object.entries(errorMessages)) {
            if (!formData[key]) {
                setError(message);
                toast.error(message);
                return;
            }
        }

        // Validasi password konfirmasi
        if (formData.password !== formData.confirmPassword) {
            setError("Password dan Confirm Password tidak sama LOL");
            toast.error("Password dan Confirm Password tidak sama LOL");
            return;
        }

        try {
            const result = await userController.Create(
                formData.role,
                formData.name,
                formData.email,
                formData.password
            );

            if (result.status === "success") {
                toast.success(result.message, {
                    duration: 3000,
                });
                const response = await userController.All();
                setUsers(response.data.data);
                closeModal();
            } else {
                setError(result.message);
                toast.error(result.message);
            }
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const errorMessages = {
            name: "Name tidak boleh kosong.",
            email: "Email tidak boleh kosong.",
        };
        for (const [key, message] of Object.entries(errorMessages)) {
            if (!formData[key]) {
                setError(message);
                toast.error(message);
                return;
            }
        }

        try {
            const result = await userController.Update(
                selectedData,
                formData.role,
                formData.name,
                formData.email,
                formData.password
            );

            if (result.status === "success") {
                toast.success(result.message, {
                    duration: 3000,
                });
                const response = await userController.All();
                setUsers(response.data.data);
                closeModal();
            } else {
                setError(result.message);
                toast.error(result.message);
            }
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const result = await userController.Delete(selectedData);
            if (result.status === "success") {
                toast.success(result.message, {
                    duration: 3000,
                });
                const response = await userController.All();
                setUsers(response.data.data);
                closeModal();
            } else {
                setError(result.message);
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // ====================
    // Effects
    // ====================
    // Fetch data users dan roles saat komponen pertama kali di-render
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Users
                const response = await userController.All();
                if (response.status === "success") {
                    setUsers(response.data.data);
                } else {
                    setErrorFetch(response.message);
                    toast.error(response.message);
                }
                // Roles
                const roleResponse = await roleController.All();
                if (roleResponse.status === "success") {
                    setRoles(roleResponse.data.data);
                } else {
                    setErrorFetch(roleResponse.message);
                    toast.error(roleResponse.message);
                }
            } catch (error) {
                setErrorFetch(error.message);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        // Panggil fungsi ini untuk data yang mau dirender
        fetchData();
    }, []);

    // ====================
    // Table
    // ====================
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        if (searchData) {
            setFilteredData(users.filter(data => {
                return Object.values(data).some(value =>
                    value && value.toString().toLowerCase().includes(searchData.toLowerCase())
                );
            }));
        } else {
            setFilteredData(users);
        }
    }, [searchData, users]);

    const columns = [
        {
            title: <p className="mb-0">No</p>,
            key: "index",
            render: (text, record, index) => (
                <p className="m-0 cs-text-1 text-center">{(currentPage - 1) * pageSize + index + 1}</p>
            ),
        },
        {
            title: <p className="mb-0">Name</p>,
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (text, record) => (
                <p className="m-0 cs-text-1">{record.name}</p>
            ),
        },
        {
            title: <p className="mb-0">Email</p>,
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
            render: (text, record) => (
                <p className="m-0 cs-text-1 ">{record.email}</p>
            ),
            responsive: ['md'],
        },
        {
            title: <p className="mb-0">Role</p>,
            dataIndex: 'role',
            key: 'role',
            sorter: (a, b) => (a.role || '').localeCompare(b.role || ''),
            render: (text, record) => (
                <p className="m-0 cs-text-1 ">{record.role}</p>
            ),
            responsive: ['md'],
        },
        {
            title: <p className="mb-0 text-end">Action</p>,
            key: "actions",
            render: (text, record) => (
                <div className="d-flex justify-content-end gap-2">
                    <Button
                        className="btn btn-sm btn-info"
                        style={{ borderRadius: "30px" }}
                        onClick={() => openReadModal(record.uuid)}
                    >
                        <i className="bi bi-eye me-1"></i> Read
                    </Button>
                    <Button
                        className="btn btn-sm btn-warning"
                        style={{ borderRadius: "30px" }}
                        onClick={() => openUpdateModal(record.uuid)}
                    >
                        <i className="bi bi-pencil-square me-1"></i> Update
                    </Button>
                    <Button
                        className="btn btn-sm btn-danger"
                        style={{ borderRadius: "30px" }}
                        onClick={() => openDeleteModal(record.uuid)}
                    >
                        <i className="bi bi-trash me-1"></i> Delete
                    </Button>
                </div>
            ),
            responsive: ["md"],
        },
              
    ];

    // Child Row Table
    // Kondisi untuk child row hanya muncul di mobile
    useEffect(() => {
        const checkMobileView = () => {
            if (window.innerWidth <= 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };
        // Cek ukuran saat pertama kali render
        checkMobileView();
        // Daftarkan event listener untuk resize
        window.addEventListener('resize', checkMobileView);
        // Hapus event listener saat komponen di-unmount
        return () => {
            window.removeEventListener('resize', checkMobileView);
        };
    }, []);

    // Tampilan Child Row yang di render
    const expandable = {
        expandedRowRender: record => (
            <>
                <div className="card">
                    <div className="card-body">
                        <p className="cs-text-1 mb-0">Email : {record.email}</p>
                        <p className="cs-text-1 mb-0">Role : {record.roles}</p>
                    </div>
                    <div className="card-footer">
                        <div className="row">
                            <div className="col-4">
                                <Button className="btn btn-sm w-100 btn-info" onClick={() => openReadModal(record.uuid)}>Read</Button>
                            </div>
                            <div className="col-4">
                                <Button className="btn btn-sm w-100 btn-warning" onClick={() => openUpdateModal(record.uuid)}>Update</Button>
                            </div>
                            <div className="col-4">
                                <Button className="btn btn-sm w-100 btn-danger" onClick={() => openDeleteModal(record.uuid)}>Delete</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        ),
        rowExpandable: record => true,
    };

    return (
        <>
            {/* Breadcrumb */}
            {/* <nav aria-label="breadcrumb text-white">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item cs-breadcrumb">Users</li>
                    <li className="breadcrumb-item cs-breadcrumb"></li>
                </ol>
            </nav> */}

            {/* Card */}
            <div
                className="card shadow"
                style={{ borderRadius: "30px" }}
            >
                <div className="card-body">
                    {/* Button Create */}
                    <div className="row mt-3">
                        <div className="col-6">
                            <h3 className="fw-bold">User</h3>
                        </div>
                        <div className="col-6 text-end">
                            <Button
                                type="primary"
                                style={{ borderRadius: "30px" }}
                                onClick={openCreateModal}
                            >Create</Button>
                        </div>
                    </div>

                    {/* Skeleton, Error Notif and Table */}
                    {loading ? (
                        <Skeleton height={20} count={10} />
                    ) : errorFetch ? (
                        <h3 className="text-danger text-center p-5">{errorFetch}</h3>
                    ) : (
                        <>
                            {/* Input Search */}
                            <div className="row">
                                <div className="col-0 col-sm-5 col-md-5 col-lg-6 col-xl-8">
                                </div>
                                <div className="col-12 col-sm-7 col-md-7 col-lg-6 col-xl-4 text-end">
                                    <Input
                                        placeholder="Search"
                                        className="mb-3"
                                        value={searchData}
                                        onChange={e => setSearchData(e.target.value)}
                                        prefix={<SearchOutlined />}
                                        style={{ width: '100%', borderRadius: "30px" }}
                                    />
                                </div>
                            </div>
                            
                            {/* Table */}
                            <div className="table-responsive">
                                <Table
                                    className="table transparent-table"
                                    columns={columns}
                                    dataSource={filteredData}
                                    rowKey="uuid"
                                    pagination={{
                                        pageSize: pageSize,
                                        current: currentPage,
                                        onChange: (page) => setCurrentPage(page),
                                        onShowSizeChange: (current, size) => setPageSize(size),
                                        showSizeChanger: true,
                                        pageSizeOptions: ['5', '10', '25', '50', '100'],
                                        showQuickJumper: true,
                                    }}
                                    expandable={isMobile ? expandable : false}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div
                    className="modal show"
                    tabIndex="-1"
                    style={{ display: 'block', backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div
                            className="modal-content"
                            style={{ borderRadius: "30px" }}
                        >
                            <div className="modal-header">
                                <h5 className="modal-title">{modalType === 'create' ? 'Create Data' : modalType === 'update' ? 'Update Data' : modalType === 'read' ? 'View Data' : 'Delete Data'}</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                {modalType !== 'delete' ? (
                                    <form>
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        <div className="mb-3">
                                            <label htmlFor="role" className="form-label"><span hidden={modalType === 'read'} style={{ color: "red" }}>*</span> Role</label>
                                            {/* Select Option 1 */}
                                            <Select
                                                id="role"
                                                name="role"
                                                isDisabled={modalType === 'read'}
                                                required
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder="-- Pilih --"
                                                value={roles.map(r => ({ value: r.uuid, label: r.name })).find(option => option.value === formData.role) || null} 
                                                onChange={(selectedOption) => setFormData({ ...formData, role: selectedOption ? selectedOption.value : null })}
                                                options={roles.map(r => ({ value: r.uuid, label: r.name }))}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label"><span hidden={modalType === 'read'} style={{ color: "red" }}>*</span> Name</label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                className="form-control"
                                                value={formData.name}
                                                onChange={handleChange}
                                                disabled={modalType === 'read'}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label"><span hidden={modalType === 'read'} style={{ color: "red" }}>*</span> Email</label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                className="form-control"
                                                value={formData.email}
                                                onChange={handleChange}
                                                disabled={modalType === 'read'}
                                                required
                                            />
                                        </div>
                                        {modalType !== 'read' && (
                                            <>
                                                <div className="mb-3 position-relative">
                                                    <label><span hidden={modalType === 'read' || modalType === 'update'} style={{ color: "red" }}>*</span> Password</label>
                                                    <div className="input-group">
                                                        <input
                                                            id="password"
                                                            name="password"
                                                            type={passwordVisible ? "text" : "password"}
                                                            className="form-control"
                                                            value={formData.password ?? ""}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn cs-btn-outline-secondary"
                                                            onClick={() => setPasswordVisible(!passwordVisible)}
                                                        >
                                                            {passwordVisible ? (
                                                                <i className="cs-icon-1 bi bi-eye-slash"></i>
                                                            ) : (
                                                                <i className="cs-icon-1 bi bi-eye"></i>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="mb-3 position-relative">
                                                    <label><span hidden={modalType === 'read' || modalType === 'update'} style={{ color: "red" }}>*</span> Confirm Password</label>
                                                    <div className="input-group">
                                                        <input
                                                            id="confirmPassword"
                                                            name="confirmPassword"
                                                            type={confirmPasswordVisible ? "text" : "password"}
                                                            className="form-control"
                                                            value={formData.confirmPassword ?? ""}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn cs-btn-outline-secondary"
                                                            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                                        >
                                                            {confirmPasswordVisible ? (
                                                                <i className="cs-icon-1 bi bi-eye-slash"></i>
                                                            ) : (
                                                                <i className="cs-icon-1 bi bi-eye"></i>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </form>
                                ) : (
                                    <p>Are you sure you want to delete this user?</p>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    style={{ borderRadius: "30px" }}
                                    onClick={closeModal}
                                >Close</button>
                                {modalType === 'create' && (
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        style={{ borderRadius: "30px" }}
                                        onClick={handleCreate}
                                    >Create</button>
                                )}
                                {modalType === 'update' && (
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        style={{ borderRadius: "30px" }}
                                        onClick={handleUpdate}
                                    >Update</button>
                                )}
                                {modalType === 'delete' && (
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        style={{ borderRadius: "30px" }}
                                        onClick={handleDelete}
                                    >Delete</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
