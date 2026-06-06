import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/api";
import "./AdminDashboard.css";

function AdminDashboard() {

    const navigate = useNavigate();

    const [stats, setStats] =
        useState({
            totalUsers: 0,
            totalAdmins: 0,
            totalNormalUsers: 0,
            totalReviews: 0,
            totalMemories: 0,
            reviewsToday: 0,
            averagePlatformScore: 0
        });

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const response =
                await api.get(
                    "/api/admin/dashboard"
                );

            setStats(
                response.data
            );

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
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
                        Loading Admin Dashboard...
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

                <h1
                    style={{
                        marginBottom: "10px"
                    }}
                >
                    Admin Control Panel
                </h1>

                <p
                    style={{
                        color: "#94a3b8",
                        marginBottom: "40px"
                    }}
                >
                    Monitor users, reviews and platform activity.
                </p>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(250px,1fr))",
                        gap: "20px"
                    }}
                >

                    <div className="admin-card">
                        <h2>
                            {stats.totalUsers}
                        </h2>
                        <p>
                            Total Users
                        </p>
                    </div>

                    <div className="admin-card">
                        <h2>
                            {stats.totalAdmins}
                        </h2>
                        <p>
                            Total Admins
                        </p>
                    </div>

                    <div className="admin-card">
                        <h2>
                            {stats.totalNormalUsers}
                        </h2>
                        <p>
                            Normal Users
                        </p>
                    </div>

                    <div className="admin-card">
                        <h2>
                            {stats.totalReviews}
                        </h2>
                        <p>
                            Total Reviews
                        </p>
                    </div>

                    <div className="admin-card">
                        <h2>
                            {stats.totalMemories}
                        </h2>
                        <p>
                            Total Memories
                        </p>
                    </div>

                    <div className="admin-card">
                        <h2>
                            {stats.reviewsToday}
                        </h2>
                        <p>
                            Reviews Today
                        </p>
                    </div>

                    <div className="admin-card">
                        <h2>
                            {
                                Number(
                                    stats.averagePlatformScore
                                ).toFixed(1)
                            }
                        </h2>
                        <p>
                            Average Platform Score
                        </p>
                    </div>

                </div>

                <h2
                    style={{
                        marginTop: "50px",
                        marginBottom: "20px"
                    }}
                >
                    Quick Actions
                </h2>

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "20px"
                    }}
                >

                    <button
                        className="admin-action-btn"
                        onClick={() =>
                            navigate(
                                "/admin/users"
                            )
                        }
                    >
                        Manage Users
                    </button>

                    <button
                        className="admin-action-btn"
                        onClick={() =>
                            navigate(
                                "/admin/reviews"
                            )
                        }
                    >
                        Manage Reviews
                    </button>

                </div>

            </div>

        </>
    );
}

export default AdminDashboard;