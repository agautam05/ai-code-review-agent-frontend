import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";

function AdminUsers() {

    const [users, setUsers] =
        useState([]);

    const [filteredUsers, setFilteredUsers] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchUsers();

    }, []);

    useEffect(() => {

        const result =
            users.filter(user =>

                user.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

                ||

                user.email
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
            );

        setFilteredUsers(
            result
        );

    }, [search, users]);

    const fetchUsers = async () => {

        try {

            const response =
                await api.get(
                    "/api/admin/users"
                );

            setUsers(
                response.data
            );

            setFilteredUsers(
                response.data
            );

        } catch (error) {

            console.error(error);

            alert(
                "Failed to load users"
            );

        } finally {

            setLoading(false);
        }
    };

    const deleteUser = async (
        id,
        name
    ) => {

        const confirmed =
            window.confirm(
                `Delete user ${name}?`
            );

        if (!confirmed)
            return;

        try {

            await api.delete(
                `/api/admin/users/${id}`
            );

            fetchUsers();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message
                ||
                "Delete failed"
            );
        }
    };

    const promoteUser = async (
        id
    ) => {

        try {

            await api.put(
                `/api/admin/users/${id}/promote`
            );

            fetchUsers();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message
                ||
                "Promotion failed"
            );
        }
    };

    const demoteAdmin = async (
        id
    ) => {

        try {

            await api.put(
                `/api/admin/users/${id}/demote`
            );

            fetchUsers();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message
                ||
                "Demotion failed"
            );
        }
    };

    if (loading) {

        return (

            <>
                <Navbar />

                <div
                    style={{
                        paddingTop: "120px",
                        textAlign: "center",
                        color: "white"
                    }}
                >
                    <h2>
                        Loading Users...
                    </h2>
                </div>

            </>
        );
    }

    return (

        <>
            <Navbar />

            <div
                style={{
                    padding: "120px 40px",
                    minHeight: "100vh",
                    background: "#020617",
                    color: "white"
                }}
            >

                <h1>
                    User Management
                </h1>

                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    style={{
                        width: "100%",
                        maxWidth: "500px",
                        padding: "12px",
                        marginTop: "20px",
                        marginBottom: "30px",
                        borderRadius: "8px",
                        border: "none"
                    }}
                />

                <div
                    style={{
                        overflowX: "auto"
                    }}
                >

                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse"
                        }}
                    >

                        <thead>

                            <tr>

                                <th style={thStyle}>
                                    Name
                                </th>

                                <th style={thStyle}>
                                    Email
                                </th>

                                <th style={thStyle}>
                                    Role
                                </th>

                                <th style={thStyle}>
                                    Reviews
                                </th>

                                <th style={thStyle}>
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                filteredUsers.map(
                                    user => (

                                        <tr
                                            key={
                                                user.id
                                            }
                                        >

                                            <td style={tdStyle}>
                                                {
                                                    user.name
                                                }
                                            </td>

                                            <td style={tdStyle}>
                                                {
                                                    user.email
                                                }
                                            </td>

                                            <td style={tdStyle}>
                                                {
                                                    user.role
                                                }
                                            </td>

                                            <td style={tdStyle}>
                                                {
                                                    user.totalReviews
                                                }
                                            </td>

                                            <td style={tdStyle}>

                                                {
                                                    user.role === "USER" && (

                                                        <button
                                                            onClick={() =>
                                                                promoteUser(
                                                                    user.id
                                                                )
                                                            }
                                                            style={{
                                                                marginRight: "10px"
                                                            }}
                                                        >
                                                            Make Admin
                                                        </button>

                                                    )
                                                }

                                                {
                                                    user.role === "ADMIN" && (

                                                        <button
                                                            onClick={() =>
                                                                demoteAdmin(
                                                                    user.id
                                                                )
                                                            }
                                                            style={{
                                                                marginRight: "10px"
                                                            }}
                                                        >
                                                            Remove Admin
                                                        </button>

                                                    )
                                                }

                                                <button
                                                    onClick={() =>
                                                        deleteUser(
                                                            user.id,
                                                            user.name
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </>
    );
}

const thStyle = {
    padding: "14px",
    borderBottom: "1px solid #334155",
    textAlign: "left"
};

const tdStyle = {
    padding: "14px",
    borderBottom: "1px solid #1e293b"
};

export default AdminUsers;