import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import "./Dashboard.css";
import IssueChart from "../components/IssueChart";
import IssuePieChart from "../components/IssuePieChart";
import Loader from "../components/Loader";

function Dashboard() {

    const [dashboard, setDashboard] =
        useState(null);

    // const [leaderboard, setLeaderboard] =
    //     useState([]);

    const [issueSearch, setIssueSearch] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const loadDashboard = async () => {

        try {

            const dashboardResponse =
                await api.get(
                    "/api/dashboard/me"
                );

            // const leaderboardResponse =
            //     await api.get(
            //         "/api/dashboard/leaderboard"
            //     );

            setDashboard(
                dashboardResponse.data
            );

            // setLeaderboard(
            //     leaderboardResponse.data
            // );

        } catch (error) {

            console.error(error);

            alert(
                "Failed to load dashboard"
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        loadDashboard();

    }, []);

    const formatIssue = (issue) => {

        return issue
            .replaceAll("_", " ")
            .toLowerCase()
            .replace(
                /\b\w/g,
                (char) =>
                    char.toUpperCase()
            );
    };

    const filteredIssues =
        dashboard
            ? Object.entries(
                dashboard.topIssues || {}
            ).filter(
                ([issue]) =>
                    issue
                        .toLowerCase()
                        .includes(
                            issueSearch.toLowerCase()
                        )
            )
            : [];

    if (loading) {

        return (

            <>
                <Navbar />

                <div
                    className="dashboard-container"
                >
                    <Loader />
                </div>

            </>
        );
    }

    return (

        <>
            <Navbar />

            <div
                className="dashboard-container"
            >

                <h1
                    className="dashboard-title"
                >
                    Developer Dashboard
                </h1>

                {
                    dashboard && (

                        <>

                            <div
                                className="stats-grid"
                            >

                                <div
                                    className="stat-card"
                                >

                                    <h3>
                                        Total Reviews
                                    </h3>

                                    <h1>
                                        {
                                            dashboard.totalReviews
                                        }
                                    </h1>

                                </div>

                                <div
                                    className="stat-card"
                                >

                                    <h3>
                                        Average Score
                                    </h3>

                                    <h1>
                                        {
                                            Number(
                                                dashboard.averageScore || 0
                                            ).toFixed(2)
                                        }
                                    </h1>

                                </div>

                                <div
                                    className="stat-card"
                                >

                                    <h3>
                                        Strongest Weakness
                                    </h3>

                                    <h2>
                                        {
                                            dashboard.strongestWeakness
                                                ? formatIssue(
                                                    dashboard.strongestWeakness
                                                )
                                                : "None"
                                        }
                                    </h2>

                                </div>
                                <div className="stat-card">
                                    <h3>
                                        Total Issue Types
                                    </h3>

                                    <h1>
                                        {
                                            Object.keys(
                                                dashboard.topIssues || {}
                                            ).length
                                        }
                                    </h1>
                                </div>

                            </div>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "2fr 1fr",
                                    gap: "24px",
                                    marginTop: "30px"
                                }}
                            >

                                <IssueChart
                                    issues={
                                        dashboard.topIssues || {}
                                    }
                                />

                                <IssuePieChart
                                    issues={
                                        dashboard.topIssues || {}
                                    }
                                />

                            </div>



                            <div
                                className="section-card"
                            >

                                <h2>
                                    Detailed Issue Analysis
                                </h2>

                                <input
                                    className="dashboard-input"
                                    placeholder="Search issues..."
                                    value={issueSearch}
                                    onChange={(e) =>
                                        setIssueSearch(
                                            e.target.value
                                        )
                                    }
                                />

                                {
                                    filteredIssues.length === 0 ? (

                                        <p>
                                            No matching issues found.
                                        </p>

                                    ) : (

                                        <table>

                                            <thead>

                                                <tr>

                                                    <th>
                                                        Issue
                                                    </th>

                                                    <th>
                                                        Frequency
                                                    </th>

                                                </tr>

                                            </thead>

                                            <tbody>

                                                {
                                                    filteredIssues.map(
                                                        (
                                                            [
                                                                issue,
                                                                count
                                                            ]
                                                        ) => (

                                                            <tr
                                                                key={
                                                                    issue
                                                                }
                                                            >

                                                                <td>
                                                                    {
                                                                        formatIssue(
                                                                            issue
                                                                        )
                                                                    }
                                                                </td>

                                                                <td>
                                                                    {
                                                                        count
                                                                    }
                                                                </td>

                                                            </tr>

                                                        )
                                                    )
                                                }

                                            </tbody>

                                        </table>

                                    )
                                }

                            </div>

                            {/* <div
                                className="section-card"
                            >

                                <h2>
                                    🏆 Developer Leaderboard
                                </h2>

                                {
                                    leaderboard.length > 0 && (

                                        <table>

                                            <thead>

                                                <tr>

                                                    <th>
                                                        Rank
                                                    </th>

                                                    <th>
                                                        User
                                                    </th>

                                                    <th>
                                                        Average Score
                                                    </th>

                                                    <th>
                                                        Total Reviews
                                                    </th>

                                                </tr>

                                            </thead>

                                            <tbody>

                                                {
                                                    leaderboard.map(
                                                        (
                                                            entry,
                                                            index
                                                        ) => (

                                                            <tr
                                                                key={
                                                                    `${entry.userName}-${index}`
                                                                }
                                                            >

                                                                <td>
                                                                    {
                                                                        index === 0
                                                                            ? "🥇"
                                                                            : index === 1
                                                                                ? "🥈"
                                                                                : index === 2
                                                                                    ? "🥉"
                                                                                    : index + 1
                                                                    }
                                                                </td>

                                                                <td>
                                                                    {
                                                                        entry.userName
                                                                    }
                                                                </td>

                                                                <td>
                                                                    {
                                                                        Number(
                                                                            entry.averageScore || 0
                                                                        ).toFixed(
                                                                            2
                                                                        )
                                                                    }
                                                                </td>

                                                                <td>
                                                                    {
                                                                        entry.totalReviews
                                                                    }
                                                                </td>

                                                            </tr>

                                                        )
                                                    )
                                                }

                                            </tbody>

                                        </table>

                                    )
                                }

                            </div> */}

                        </>

                    )
                }

            </div>

        </>
    );
}

export default Dashboard;