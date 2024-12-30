import React, { useEffect, useState } from "react";
import { AllUsers, Create, Read, Update, Delete } from "../../controller/userController";
import { Modal, Button, Form } from 'react-bootstrap';

export default function Profile() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

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

    // Fungsi untuk membuka modal Create
    const openCreateModal = () => {
        setModalType('create');
        setShowModal(true);
        setFormData({ name: '', email: '', password: '' });
    };

    // Fungsi untuk membuka modal Read
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

    // Fungsi untuk membuka modal Update
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

    // Fungsi untuk membuka modal Delete
    const openDeleteModal = (uuid) => {
        setModalType('delete');
        setSelectedUser(uuid);
        setShowModal(true);
    };

    // Fungsi untuk menutup modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedUser(null);
        setFormData({ name: '', email: '', password: '' });
    };

    // Fungsi untuk menangani perubahan form data
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Fungsi untuk meng-handle Create
    const handleCreate = async () => {
        try {
            await Create(formData.name, formData.email, formData.password);
            alert("User created successfully");
            closeModal();
            // Refresh the users list
            const response = await AllUsers();
            setUsers(response.data.data);
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    // Fungsi untuk meng-handle Update
    const handleUpdate = async () => {
        try {
            await Update(selectedUser, formData.name, formData.email, formData.password);
            alert("User updated successfully");
            closeModal();
            // Refresh the users list
            const response = await AllUsers();
            setUsers(response.data.data);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    // Fungsi untuk meng-handle Delete
    const handleDelete = async () => {
        try {
            await Delete(selectedUser);
            alert("User deleted successfully");
            closeModal();
            // Refresh the users list
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
                    <li className="breadcrumb-item cs-breadcrumb">TEST</li>
                    <li className="breadcrumb-item cs-breadcrumb">TEST</li>
                    <li className="breadcrumb-item cs-breadcrumb">TEST</li>
                </ol>
            </nav>

            <div className="card shadow">
                <div className="card-body">
                    <h1 className="fw-bold mb-4">Users</h1>
                    <Button variant="primary" onClick={openCreateModal}>Create User</Button>

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
                                                        <Button className="m-1" variant="info" onClick={() => openReadModal(user.uuid)}>Read</Button>
                                                        <Button className="m-1" variant="warning" onClick={() => openUpdateModal(user.uuid)}>Update</Button>
                                                        <Button className="m-1" variant="danger" onClick={() => openDeleteModal(user.uuid)}>Delete</Button>
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
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalType === 'create' ? 'Create User' : modalType === 'update' ? 'Update User' : modalType === 'read' ? 'View User' : 'Delete User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalType !== 'delete' ? (
                        <Form>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={modalType === 'read'}
                                />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={modalType === 'read'}
                                />
                            </Form.Group>
                            {/* Menyembunyikan input password pada mode 'read' */}
                            {modalType !== 'read' && (
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled={modalType === 'read'}
                                    />
                                </Form.Group>
                            )}
                        </Form>
                    ) : (
                        <p>Are you sure you want to delete this user?</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {modalType !== 'delete' ? (
                        <>
                            <Button variant="secondary" onClick={closeModal}>Close</Button>
                            <Button variant="primary" onClick={modalType === 'create' ? handleCreate : handleUpdate}>
                                {modalType === 'create' ? 'Create' : 'Update'}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="secondary" onClick={closeModal}>No</Button>
                            <Button variant="danger" onClick={handleDelete}>Yes</Button>
                        </>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
}
