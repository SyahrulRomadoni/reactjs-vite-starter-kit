import React, { useEffect, useState } from "react";
import { AllUsers, Create, Read, Update, Delete } from "../../controller/userController";
import { toast } from 'react-hot-toast';

export default function Index() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    // Formdata
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    // Fungsi untuk mengambil data users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await AllUsers();
                setUsers(response.data.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const openCreateModal = () => {
        setModalType('create');
        setShowModal(true);
        setFormData({ name: '', email: '', password: '' });
    };

    const openReadModal = async (uuid) => {
        setModalType('read');
        setSelectedUser(uuid);
        setShowModal(true);
        try {
            const response = await Read(uuid);
            setFormData({ name: response.data.name, email: response.data.email, password: '' });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const openUpdateModal = async (uuid) => {
        setModalType('update');
        setSelectedUser(uuid);
        setShowModal(true);
        try {
            const response = await Read(uuid);
            setFormData({ name: response.data.name, email: response.data.email, password: '' });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const openDeleteModal = (uuid) => {
        setModalType('delete');
        setSelectedUser(uuid);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedUser(null);
        setFormData({ name: '', email: '', password: '' });
    };

    // Handle perubahan input form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreate = async () => {
        // Validasi individual
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
            await Create(formData.name, formData.email, formData.password);
            toast.success("User created successfully");
            closeModal();
            const response = await AllUsers();
            setUsers(response.data.data);
        } catch (error) {
            toast.error("Error creating user.");
            console.error("Error creating user:", error);
        }
    };

    const handleUpdate = async () => {
        // Validasi individual
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
            await Update(selectedUser, formData.name, formData.email, formData.password);
            toast.success("User updated successfully");
            closeModal();
            const response = await AllUsers();
            setUsers(response.data.data);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await Delete(selectedUser);
            toast.success("User deleted successfully");
            closeModal();
            const response = await AllUsers();
            setUsers(response.data.data);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div>
            <nav aria-label="breadcrumb text-white">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item cs-breadcrumb">Users</li>
                </ol>
            </nav>

            <div className="card shadow">
                <div className="card-body">
                    <h1 className="fw-bold mb-4">Users</h1>
                    <button className="btn btn-primary" onClick={openCreateModal}>Create User</button>

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="card mt-3">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user) => (
                                                <tr key={user.uuid}>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.roles.name}</td>
                                                    <td className="text-end">
                                                        <button className="btn btn-info m-1" onClick={() => openReadModal(user.uuid)}>Read</button>
                                                        <button className="btn btn-warning m-1" onClick={() => openUpdateModal(user.uuid)}>Update</button>
                                                        <button className="btn btn-danger m-1" onClick={() => openDeleteModal(user.uuid)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal show" tabIndex="-1" style={{ display: 'block' }} aria-hidden="true">
                    <div className="modal-dialog">
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
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input
                                                type="text"
                                                name="name"
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
                                                type="email"
                                                name="email"
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
                                                    type="password"
                                                    name="password"
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
                                {modalType !== 'delete' ? (
                                    <>
                                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={modalType === 'create' ? handleCreate : handleUpdate}
                                        >
                                            {modalType === 'create' ? 'Create' : 'Update'}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button type="button" className="btn btn-secondary" onClick={closeModal}>No</button>
                                        <button type="button" className="btn btn-danger" onClick={handleDelete}>Yes</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
