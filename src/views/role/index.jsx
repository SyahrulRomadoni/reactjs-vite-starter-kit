// src/views/role/index.jsx

import { useEffect, useState } from "react";
import { All, Create, Read, Update, Delete } from "../../controller/roleController";
import { toast } from 'react-hot-toast';

export default function Index() {
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedData, setSelectedData] = useState(null);

    // Formdata
    const [formData, setFormData] = useState({
        name: ''
    });

    // Fungsi untuk mengambil data atau tampilan yang mau dirender
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await All();
                setRoles(response.data.data);
            } catch (error) {
                setError(error.message);
                toast.error(error.message);
                console.error("Error fetching roles : " + error);
            } finally {
                setLoading(false);
            }
        };

        // Panggil fungsi ini untuk data yang mau dirender
        fetchData();
    }, []);

    // Jika ada kendala di UseEffect kalo data role terjadi kendala
    // if (error) {
    //     // Tampilkan error jika ada
    //     return <div>Error: {error}</div>;
    // }

    // Bisa memnbuat animasi loading kalo data masih belum dapat
    // if (!roles) {
    //     // Tampilkan loading saat data belum ada
    //     // return <div>Loading...</div>;
    //     return;
    // }

    // Modal kondisi
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
            const response = await Read(uuid);
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
            const response = await Read(uuid);
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
            const result = await Create(formData.name);
            toast.success(result.message, {
                duration: 3000,
            });
            const response = await All();
            setRoles(response.data.data);
            closeModal();
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
            // console.error("Error create role : " + error.message);
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
            const result = await Update(selectedData, formData.name);
            toast.success(result.message, {
                duration: 3000,
            });
            const response = await All();
            setRoles(response.data.data);
            closeModal();
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
            // console.error("Error update role : " + error.message);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const result = await Delete(selectedData);
            toast.success(result.message, {
                duration: 3000,
            });
            const response = await All();
            setRoles(response.data.data);
            closeModal();
        } catch (error) {
            toast.error(error.message);
            // console.error("Error deleting role:" + error.message);
        }
    };

    return (
        <div>
            <nav aria-label="breadcrumb text-white">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item cs-breadcrumb">Roles</li>
                    <li className="breadcrumb-item cs-breadcrumb"></li>
                </ol>
            </nav>

            <div className="card shadow">
                <div className="card-body">
                    <h1 className="fw-bold mb-4">Roles</h1>
                    <button className="btn btn-primary" onClick={openCreateModal}>Create Role</button>

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
                                                <th className="text-end">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <>
                                                {roles.map((role) => (
                                                    <tr key={role.uuid}>
                                                        <td>{role.name}</td>
                                                        <td className="text-end">
                                                            <button className="btn btn-sm btn-info m-1" onClick={() => openReadModal(role.uuid)}>Read</button>
                                                            <button className="btn btn-sm btn-warning m-1" onClick={() => openUpdateModal(role.uuid)}>Update</button>
                                                            <button className="btn btn-sm btn-danger m-1" onClick={() => openDeleteModal(role.uuid)}>Delete</button>
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
                                <h5 className="modal-title">{modalType === 'create' ? 'Create Role' : modalType === 'update' ? 'Update Role' : modalType === 'read' ? 'View Role' : 'Delete Role'}</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                {modalType !== 'delete' ? (
                                    <form>
                                        {error && <div className="alert alert-danger">{error}</div>}
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
                                    </form>
                                ) : (
                                    <p>Are you sure you want to delete this role?</p>
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
