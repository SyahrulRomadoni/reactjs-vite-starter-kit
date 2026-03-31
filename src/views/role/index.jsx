// src/views/role/index.jsx

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

// Controller
import * as roleController from "../../controller/roleController";

export default function Index() {
    // ====================
    // State
    // ====================
    // state untuk menyimpan data roles
    const [roles, setRoles] = useState([]);

    // state untuk error, errorFetch dan loading
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

    // state untuk form data
    const [formData, setFormData] = useState({
        name: ''
    });

    // ====================
    // Get Data
    // ====================
    useEffect(() => {
        const getDataRole = async () => {
            try {
                setLoading(true);
                const response = await roleController.All();
                if (response.status === "success") {
                    setRoles(response.data.data);
                } else {
                    setErrorFetch(response.message);
                    toast.error(response.message);
                }
            } catch (error) {
                setErrorFetch(error.message);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        // Panggil fungsi ini untuk data yang mau dirender
        getDataRole();
    }, []);

    // ====================
    // Table
    // ====================
    const [totalData, setTotalData] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        if (searchData) {
            setFilteredData(roles.filter(data => {
                return Object.values(data).some(value =>
                    value && value.toString().toLowerCase().includes(searchData.toLowerCase())
                );
            }));
        } else {
            setFilteredData(roles);
        }
    }, [searchData, roles]);

    const columns = [
        {
            title: <p className="mb-0">No</p>,
            key: "index",
            render: (text, record, index) => (
                <p className="m-0 cs-text-1 text-center">{(currentPage - 1) * pageSize + index + 1}</p>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (text, record) => (
                <p className="m-0 cs-text-1">{record.name}</p>
            ),
        },
        {
            title: <p className="mb-0 text-end">Action</p>,
            key: "actions",
            render: (text, record) => (
                <div className="d-flex justify-content-end gap-2">
                    <Button
                        className="btn btn-sm btn-info"
                        style={{ borderRadius: "20px" }}
                        onClick={() => openReadModal(record.uuid)}
                    >
                        <i className="bi bi-eye me-1"></i> Read
                    </Button>
                    <Button
                        className="btn btn-sm btn-warning"
                        style={{ borderRadius: "20px" }}
                        onClick={() => openUpdateModal(record.uuid)}
                    >
                        <i className="bi bi-pencil-square me-1"></i> Update
                    </Button>
                    <Button
                        className="btn btn-sm btn-danger"
                        style={{ borderRadius: "20px" }}
                        onClick={() => openDeleteModal(record.uuid)}
                    >
                        <i className="bi bi-trash me-1"></i> Delete
                    </Button>
                </div>
            ),
            responsive: ["md"],
        },
    ];

    // ====================
    // Handler
    // ====================
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Modal Control
    const openCreateModal = () => {
        setModalType('create');
        setShowModal(true);
        setFormData({ name: '' });
    };

    const openReadModal = async (uuid) => {
        setModalType('read');
        setSelectedData(uuid);
        setShowModal(true);
        try {
            const response = await roleController.Read(uuid);
            setFormData({ name: response.data.name });
        } catch (error) {
            console.error("Error fetching role data:", error);
        }
    };

    const openUpdateModal = async (uuid) => {
        setModalType('update');
        setSelectedData(uuid);
        setShowModal(true);
        try {
            const response = await roleController.Read(uuid);
            setFormData({ name: response.data.name });
        } catch (error) {
            console.error("Error fetching role data:", error);
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
        setFormData({ name: '' });
        setError("");
    };

    // CRUDS
    const handleCreate = async (e) => {
        e.preventDefault();

        // Validasi individual
        const errorMessages = {
            name: "Name tidak boleh kosong."
        };
        for (const [key, message] of Object.entries(errorMessages)) {
            if (!formData[key]) {
                setError(message);
                toast.error(message);
                return;
            }
        }

        try {
            const result = await roleController.Create(formData.name);
            if (result.status === "success") {
                toast.success(result.message, {
                    duration: 3000,
                });
                const response = await roleController.All();
                setRoles(response.data.data);
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

        // Validasi individual
        const errorMessages = {
            name: "Name tidak boleh kosong."
        };
        for (const [key, message] of Object.entries(errorMessages)) {
            if (!formData[key]) {
                setError(message);
                toast.error(message);
                return;
            }
        }

        try {
            const result = await roleController.Update(selectedData, formData.name);
            if (result.status === "success") {
                toast.success(result.message, {
                    duration: 3000,
                });
                const response = await roleController.All();
                setRoles(response.data.data);
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
            const result = await roleController.Delete(selectedData);
            if (result.status === "success") {
                toast.success(result.message, {
                    duration: 3000,
                });
                const response = await roleController.All();
                setRoles(response.data.data);
                closeModal();
            } else {
                setError(result.message);
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            {/* Breadcrumb */}
            {/* <nav aria-label="breadcrumb text-white">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item cs-breadcrumb">Roles</li>
                    <li className="breadcrumb-item cs-breadcrumb"></li>
                </ol>
            </nav> */}

            {/* Card */}
            <div
                className="card shadow"
                style={{ borderRadius: "20px" }}
            >
                <div className="card-body">
                    {/* Button Create */}
                    <div className="row mt-3">
                        <div className="col-6">
                            <h3 className="fw-bold">Roles</h3>
                        </div>
                        <div className="col-6 text-end">
                            <Button
                                type="primary"
                                style={{ borderRadius: "20px" }}
                                onClick={openCreateModal}
                            >Create</Button>
                        </div>
                    </div>

                    {/* Skeleton, Error Notif and Table */}
                    {loading ? (
                        <>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ width: "10%" }}>
                                    <Skeleton height={20} width="100%" />
                                </div>
                                <div style={{ width: "40%" }}>
                                    <Skeleton height={20} width="100%" />
                                </div>
                            </div>
                            <Skeleton height={20} count={10} />
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ width: "10%" }}>
                                    <Skeleton height={20} width="100%" />
                                </div>
                                <div style={{ width: "20%" }}>
                                    <Skeleton height={20} width="100%" />
                                </div>
                            </div>
                        </>
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
                                        style={{ width: '100%', borderRadius: "20px" }}
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
                                        total: totalData,
                                        pageSize: pageSize,
                                        current: currentPage,
                                        onChange: (page) => setCurrentPage(page),
                                        onShowSizeChange: (current, size) => setPageSize(size),
                                        showSizeChanger: true,
                                        pageSizeOptions: ['5', '10', '25', '50', '100'],
                                        showQuickJumper: true,
                                        showTotal: (total, range) => (
                                            <span style={{ left: 0, position: "absolute" }}>
                                                Showing {range[0]}-{range[1]} of {total} items
                                            </span>
                                        ),
                                    }}
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
                            style={{ borderRadius: "20px" }}
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
                                    </form>
                                ) : (
                                    <p>Are you sure you want to delete this role?</p>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    style={{ borderRadius: "20px" }}
                                    onClick={closeModal}
                                >Close</button>
                                {modalType === 'create' && (
                                    <button 
                                        type="button"
                                        className="btn btn-primary"
                                        style={{ borderRadius: "20px" }}
                                        onClick={handleCreate}
                                    >Create</button>
                                )}
                                {modalType === 'update' && (
                                    <button 
                                        type="button"
                                        className="btn btn-primary"
                                        style={{ borderRadius: "20px" }}
                                        onClick={handleUpdate}
                                    >Update</button>
                                )}
                                {modalType === 'delete' && (
                                    <button 
                                        type="button"
                                        className="btn btn-danger"
                                        style={{ borderRadius: "20px" }}
                                        onClick={handleDelete}
                                    >Yes</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
