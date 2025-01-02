// src/views/user/index.jsx

import { useEffect, useState } from "react";
import * as userController from "../../controller/userController";
import * as roleController from "../../controller/roleController";
import { toast } from 'react-hot-toast';

export default function Index() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedData, setSelectedData] = useState(null);

    // Formdata
    const [formData, setFormData] = useState({
        role: '',
        name: '',
        email: '',
        password: ''
    });

    // Fungsi untuk mengambil data atau tampilan yang mau dirender
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // All User Data
                const response = await userController.All();
                setUsers(response.data.data);

                // All Role Data
                const roleResponse = await roleController.All();
                setRoles(roleResponse.data.data);
            } catch (error) {
                setError(error.message);
                toast.error(error.message);
                console.error("Error fetching users : " + error);
            } finally {
                setLoading(false);
            }
        };

        // Panggil fungsi ini untuk data yang mau dirender
        fetchData();
    }, []);

    // Jika ada kendala di UseEffect kalo data user terjadi kendala
    // if (error) {
    //     // Tampilkan error jika ada
    //     return <div>Error: {error}</div>;
    // }

    // Bisa memnbuat animasi loading kalo data masih belum dapat
    // if (!users) {
    //     // Tampilkan loading saat data belum ada
    //     // return <div>Loading...</div>;
    //     return;
    // }

    // Modal kondisi
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

    // Handle perubahan input form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreate = async (e) => {
        e.preventDefault();

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
            const result = await userController.Create(formData.role, formData.name, formData.email, formData.password);
            toast.success(result.message, {
                duration: 3000,
            });
            const response = await userController.All();
            setUsers(response.data.data);
            closeModal();
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
            // console.error("Error create user : " + error.message);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

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
            const result = await userController.Update(selectedData, formData.role, formData.name, formData.email, formData.password);
            toast.success(result.message, {
                duration: 3000,
            });
            const response = await userController.All();
            setUsers(response.data.data);
            closeModal();
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
            // console.error("Error update user : " + error.message);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const result = await userController.Delete(selectedData);
            toast.success(result.message, {
                duration: 3000,
            });
            const response = await userController.All();
            setUsers(response.data.data);
            closeModal();
        } catch (error) {
            toast.error(error.message);
            // console.error("Error deleting user:" + error.message);
        }
    };

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
                    <button className="btn btn-primary" onClick={openCreateModal}>Create User</button>

                    {loading ? (
                        // Bisa di ganti skeleten atau animasi loading
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
                                                <th className="text-end">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <>
                                                {users.map((user) => (
                                                    <tr key={user.uuid}>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.roles.name}</td>
                                                        <td className="text-end">
                                                            <button className="btn btn-sm btn-info m-1" onClick={() => openReadModal(user.uuid)}>Read</button>
                                                            <button className="btn btn-sm btn-warning m-1" onClick={() => openUpdateModal(user.uuid)}>Update</button>
                                                            <button className="btn btn-sm btn-danger m-1" onClick={() => openDeleteModal(user.uuid)}>Delete</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </>
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
                                    <button type="button" className="btn btn-danger" onClick={handleDelete}>Yes</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
