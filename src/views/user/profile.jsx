// src/views/user/index.jsx

import "react-loading-skeleton/dist/skeleton.css";
import React, { useMemo } from "react";
import Skeleton from "react-loading-skeleton";

export default function Profile({ user }) {

    // Generate inisial dari email
    const initials = useMemo(() => {
        if (!user?.email) return "?";
        const namePart = user.email.split("@")[0];
        if (namePart.length === 1) return namePart.toUpperCase();
        return (namePart[0] + namePart[namePart.length - 1]).toUpperCase();
    }, [user]);

    return (
        <div className="card shadow">
            <div className="card-body">

                <h1 className="fw-bold mb-4">Profile</h1>

                {!user ? (
                    <Skeleton height={20} count={3} />
                ) : (
                    <div className="row align-items-center">
                        
                        {/* Avatar */}
                        <div className="col-md-3 text-center mb-3">
                            {user?.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt="avatar"
                                    style={{
                                        width: "120px",
                                        height: "120px",
                                        borderRadius: "50%",
                                        objectFit: "cover"
                                    }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: "120px",
                                        height: "120px",
                                        borderRadius: "50%",
                                        backgroundColor: "#6c757d",
                                        color: "#fff",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "32px",
                                        fontWeight: "bold",
                                        margin: "0 auto"
                                    }}
                                >
                                    {initials}
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="col-md-9">
                            <p><strong>Nama:</strong> {user?.name || "-"}</p>
                            <p><strong>Email:</strong> {user?.email || "-"}</p>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}