// src/views/user/index.jsx

import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";
import { Table, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { toast } from 'react-hot-toast';
import Skeleton from "react-loading-skeleton";
import Select from 'react-select';

// Controller
import * as userController from "../../controller/userController";
import * as roleController from "../../controller/roleController";

export default function Index() {
    // =================================================== State =================================================== //
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
        role: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    // State untuk mengatur password dan confirm password
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    // =================================================== Fetch Data =================================================== //
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

    // =================================================== Modal =================================================== //
    const openCreateModal = () => {
        setModalType('create');
        setShowModal(true);
        setFormData({
            role: '',
            name: '',
            email: '',
            password: ''
        });
    };

    const openReadModal = async (id) => {
        setModalType('read');
        setSelectedData(id);
        setShowModal(true);

        try {
            // Action ke API
            const response = await userController.Read(id);
            console.log(id);
            console.log(response);
            // Kalo Pakai select option 1 maka comment saja baris kode ini, tapi kalo pakai select option 2 maka uncomment baris kode ini
            const selectedRole = roles.find(role => role.id === response.data.id_role);
            // Set data form
            setFormData({ 
                // Kalo Pakai select option 1
                // role: response.data.id_role,

                // Kalo Pakai select option 2
                role: selectedRole ? { value: selectedRole.id, label: selectedRole.name } : '',
                
                name: response.data.name, 
                email: response.data.email, 
                password: '' 
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };    

    const openUpdateModal = async (id) => {
        setModalType('update');
        setSelectedData(id);
        setShowModal(true);

        try {
            // Action ke API
            const response = await userController.Read(id);
            // Kalo Pakai select option 1 maka comment saja baris kode ini, tapi kalo pakai select option 2 maka uncomment baris kode ini
            const selectedRole = roles.find(role => role.id === response.data.id_role);
            // Set data form
            setFormData({
                // Kalo Pakai select option 1
                // role: response.data.id_role,

                // Kalo Pakai select option 2
                role: selectedRole ? { value: selectedRole.id, label: selectedRole.name } : '',

                name: response.data.name,
                email: response.data.email,
                password: ''
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const openDeleteModal = (id) => {
        setModalType('delete');
        setSelectedData(id);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedData(null);
        setFormData({
            role: '',
            name: '',
            email: '',
            password: ''
        });
        setError("");
    };

    // =================================================== Handle perubahan input form =================================================== //
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSelectChange = (selectedOption) => {
        setFormData({
            ...formData,
            role: selectedOption,
        });
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
            setError("Password dan Confirm Password tidak sama");
            toast.error("Password dan Confirm Password tidak sama");
            return;
        }

        try {
            // Kalo Pakai select option 1
            // maka pakai formData.role itu tinggal pakai formData.role saja cuman tidak ada seach sama multi data jadi datanya cuman satu saja, karna dia select option biasa

            // Kalo Pakai select option 2
            // maka pakai formData.role.value itu dia berupa data object array data nya bisa lebih dari 1 jika isMulti itu true, kalo isMulti nya false maka cuman satu data saja cuman object nya array, disini saya buat isMulti aku comment karna saya butuh search saja

            const result = await userController.Create(
                formData.role.value,
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
            // Kalo Pakai select option 1
            // maka pakai formData.role itu tinggal pakai formData.role saja cuman tidak ada seach sama multi data jadi datanya cuman satu saja, karna dia select option biasa

            // Kalo Pakai select option 2
            // maka pakai formData.role.value itu dia berupa data object array data nya bisa lebih dari 1 jika isMulti itu true, kalo isMulti nya false maka cuman satu data saja cuman object nya array, disini saya buat isMulti aku comment karna saya butuh search saja

            const result = await userController.Update(
                selectedData,
                formData.role.value,
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

    // =================================================== Table =================================================== //
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 2;

    useEffect(() => {
        if (searchData) {
            setFilteredData(users.filter(data =>
                data.name.toLowerCase().includes(searchData.toLowerCase()) ||
                data.email.toLowerCase().includes(searchData.toLowerCase())
            ));
        } else {
            setFilteredData(users);
        }
    }, [searchData, users]);

    const columns = [
        {
            title: <p className="mb-0">No</p>,
            key: "index",
            render: (text, record, index) => (
                <p className="m-0 cs-text-1">{(currentPage - 1) * pageSize + index + 1}</p>
            ),
        },
        // {
        //     title: <p className="mb-0">No</p>,
        //     dataIndex: 'id',
        //     key: 'id',
        //     sorter: (a, b) => a.id - b.id,
        //     render: (text, record) => (
        //         <p className="m-0 cs-text-1">{record.id}</p>
        //     ),
        // },                      
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
            dataIndex: 'roles.name',
            key: 'role',
            sorter: (a, b) => (a.roles || '').localeCompare(b.roles || ''),
            render: (text, record) => (
                <p className="m-0 cs-text-1 ">{record.roles}</p>
            ),
            responsive: ['md'],
        },
        {
            title: <p className="mb-0" style={{ float: 'right' }}>Action</p>,
            key: 'actions',
            render: (text, record) => (
                <div className="mb-0" style={{ float: 'right' }}>
                    <Button className="btn btn-sm btn-info m-1" onClick={() => openReadModal(record.id)}>Read</Button>
                    <Button className="btn btn-sm btn-warning m-1" onClick={() => openUpdateModal(record.id)}>Update</Button>
                    <Button className="btn btn-sm btn-danger m-1" onClick={() => openDeleteModal(record.id)}>Delete</Button>
                </div>
            ),
            responsive: ['md'],
        },
    ];

    // =================================================== Child Row Table =================================================== //
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
                                <Button className="btn btn-sm w-100 btn-info" onClick={() => openReadModal(record.id)}>Read</Button>
                            </div>
                            <div className="col-4">
                                <Button className="btn btn-sm w-100 btn-warning" onClick={() => openUpdateModal(record.id)}>Update</Button>
                            </div>
                            <div className="col-4">
                                <Button className="btn btn-sm w-100 btn-danger" onClick={() => openDeleteModal(record.id)}>Delete</Button>
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
            <nav aria-label="breadcrumb text-white">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item cs-breadcrumb">Users</li>
                    <li className="breadcrumb-item cs-breadcrumb"></li>
                </ol>
            </nav>

            {/* Table */}
            <div className="card shadow">
                <div className="card-body">
                    <div className="row">
                        <div className="col-6">
                            <h3 className="fw-bold">User</h3>
                        </div>
                        <div className="col-6 text-end">
                            <Button type="primary" onClick={openCreateModal}>Create</Button>
                        </div>
                    </div>

                    {loading ? (
                        <Skeleton height={20} count={10} />
                    ) : errorFetch ? (
                        <h3 className="text-danger text-center p-5">{errorFetch}</h3>
                    ) : (
                        <>
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
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </div>
                            
                            <div className="table-responsive">
                                <Table
                                    className="table transparent-table"
                                    columns={columns}
                                    dataSource={filteredData}
                                    rowKey="id"
                                    pagination={{
                                        pageSize: pageSize,
                                        onChange: (page) => setCurrentPage(page),
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
                <div className="modal show" tabIndex="-1" style={{ display: 'block', backgroundColor: "rgba(0, 0, 0, 0.5)" }} aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalType === 'create' ? 'Create Data' : modalType === 'update' ? 'Update Data' : modalType === 'read' ? 'View Data' : 'Delete Data'}</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                {modalType !== 'delete' ? (
                                    <form>
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        <div className="mb-3">
                                            <label htmlFor="role" className="form-label">Role</label>
                                            {/* Select Option 1 */}
                                            {/* <select
                                                id="role"
                                                name="role"
                                                className="form-control"
                                                value={formData.role}
                                                onChange={handleChange}
                                                disabled={modalType === 'read'}
                                                required
                                            >
                                                <option value="">Select Role</option>
                                                {roles.map((role) => (
                                                    <option key={role.id} value={role.id}>{role.name}</option>
                                                ))}
                                            </select> */}

                                            {/* Select Option 2 */}
                                            <Select
                                                id="role"
                                                name="role"
                                                // isMulti
                                                value={formData.role}
                                                onChange={handleSelectChange}
                                                isDisabled={modalType === 'read'}
                                                required
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder="-- Pilih --"
                                                options={roles.map((role) => ({ value: role.id, label: role.name })) || []}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
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
                                            <label htmlFor="email" className="form-label">Email</label>
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
                                                    <label>Password</label>
                                                    <div className="input-group">
                                                        <input
                                                            id="password"
                                                            name="password"
                                                            type={passwordVisible ? "text" : "password"}
                                                            className="form-control"
                                                            value={formData.password}
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
                                                    <label>Confirm Password</label>
                                                    <div className="input-group">
                                                        <input
                                                            id="confirmPassword"
                                                            name="confirmPassword"
                                                            type={confirmPasswordVisible ? "text" : "password"}
                                                            className="form-control"
                                                            value={formData.confirmPassword}
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
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                {modalType === 'create' && (
                                    <button type="button" className="btn btn-primary" onClick={handleCreate}>Create</button>
                                )}
                                {modalType === 'update' && (
                                    <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update</button>
                                )}
                                {modalType === 'delete' && (
                                    <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
