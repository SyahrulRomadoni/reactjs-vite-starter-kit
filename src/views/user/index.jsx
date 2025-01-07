import { useEffect, useState } from "react";
import * as userController from "../../controller/userController";
import * as roleController from "../../controller/roleController";
import { toast } from 'react-hot-toast';
import { Table, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default function Index() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedData, setSelectedData] = useState(null);

    const [formData, setFormData] = useState({
        role: '',
        name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await userController.All();
                setUsers(response.data.data);
                const roleResponse = await roleController.All();
                setRoles(roleResponse.data.data);
            } catch (error) {
                setError(error.message);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const openCreateModal = () => {
        setModalType('create');
        setShowModal(true);
        setFormData({ name: '', email: '', password: '' });
    };

    const openReadModal = async (uuid) => {
        setModalType('read');
        setSelectedData(uuid);
        setShowModal(true);
        try {
            const response = await userController.Read(uuid);
            setFormData({ role: response.data.uuid_role, name: response.data.name, email: response.data.email, password: '' });
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
            setFormData({ role: response.data.uuid_role, name: response.data.name, email: response.data.email, password: '' });
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
        setFormData({ name: '', email: '', password: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        const errorMessages = {
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

        try {
            const result = await userController.Create(formData.role, formData.name, formData.email, formData.password);
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
            const result = await userController.Update(selectedData, formData.role, formData.name, formData.email, formData.password);
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

    // Table
    const [searchText, setSearchText] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        if (searchText) {
            setFilteredUsers(users.filter(user =>
                user.name.toLowerCase().includes(searchText.toLowerCase()) ||
                user.email.toLowerCase().includes(searchText.toLowerCase())
            ));
        } else {
            setFilteredUsers(users);
        }
    }, [searchText, users]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <p className="m-0 cs-text-1">{record.name}</p>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text, record) => (
                <p className="m-0 cs-text-1">{record.name}</p>
            ),
        },
        {
            title: 'Role',
            dataIndex: 'roles.name',
            key: 'role',
            render: (text, record) => (
                <p className="m-0 cs-text-1">{record.name}</p>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <div className="text-end">
                    <Button className="btn btn-sm btn-info m-1" onClick={() => openReadModal(record.uuid)}>Read</Button>
                    <Button className="btn btn-sm btn-warning m-1" onClick={() => openUpdateModal(record.uuid)}>Update</Button>
                    <Button className="btn btn-sm btn-danger m-1" onClick={() => openDeleteModal(record.uuid)}>Delete</Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <nav aria-label="breadcrumb text-white">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item cs-breadcrumb">Users</li>
                    <li className="breadcrumb-item cs-breadcrumb"></li>
                </ol>
            </nav>

            <div className="card shadow">
                <div className="card-body">
                    <h1 className="fw-bold mb-4">Users</h1>

                    <div className="row">
                        <div className="col-7 col-sm-7 col-md-6 col-lg-8 col-xl-9">
                            <Button type="primary" onClick={openCreateModal}>Create User</Button>
                        </div>
                        <div className="col-5 col-sm-5 col-md-6 col-lg-4 col-xl-3 text-end">
                            <Input
                                placeholder="Search"
                                className="mb-3"
                                value={searchText}
                                onChange={e => setSearchText(e.target.value)}
                                prefix={<SearchOutlined />}
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="table-responsive">
                            <Table
                                className="table transparent-table"
                                columns={columns}
                                dataSource={filteredUsers}
                                rowKey="uuid"
                                pagination={{
                                    // pageSize: 5,
                                    showSizeChanger: true,
                                    pageSizeOptions: ['5', '10', '25', '50', '100'],
                                    showQuickJumper: true,
                                    // onShowSizeChange: (current, size) => {
                                    //     console.log(current, size);
                                    // },
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal show" tabIndex="-1" style={{ display: 'block' }} aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalType === 'create' ? 'Create User' : modalType === 'update' ? 'Update User' : modalType === 'read' ? 'View User' : 'Delete User'}</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                {modalType !== 'delete' ? (
                                    <form>
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        <div className="mb-3">
                                            <label htmlFor="role" className="form-label">Role</label>
                                            <select
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
                                                    <option key={role.uuid} value={role.uuid}>{role.name}</option>
                                                ))}
                                            </select>
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
                                            <div className="mb-3">
                                                <label htmlFor="password" className="form-label">Password</label>
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    className="form-control"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    disabled={modalType === 'read'}
                                                />
                                            </div>
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
        </div>
    );
}
