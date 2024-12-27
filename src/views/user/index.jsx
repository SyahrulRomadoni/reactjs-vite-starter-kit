// src/views/user/index.jsx
import React, { useEffect, useState } from "react";
import { AllUsers } from "../../controller/userController";

export default function Profile() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="p-5 mb-4 cs-bg-1 rounded-3 shadow">
            <div className="container-fluid py-5">
                <h1 className="fw-bold mb-4">Users</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.uuid}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.roles.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
