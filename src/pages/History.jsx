import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import ScoreTrendChart from "../components/ScoreTrendChart";

function History() {

    const [reviews, setReviews] =
        useState([]);

    const [expandedReview, setExpandedReview] =
        useState(null);

    const [expandedImprovedCode,
        setExpandedImprovedCode] =
        useState(null);

    const loadHistory = async () => {

        try {

            const response =
                await api.get(
                    "/api/reviews/me"
                );

            const loadedReviews =
                Array.isArray(response.data)
                    ? response.data
                    : Array.isArray(
                        response.data?.reviews
                    )
                        ? response.data.reviews
                        : [];

            setReviews(
                loadedReviews
            );

        } catch (error) {

            console.error(error);

            alert(
                "Failed to load history"
            );
        }
    };

    useEffect(() => {

        loadHistory();

    }, []);

    const getSeverityColor =
        (severity) => {

            switch (severity) {

                case "CRITICAL":
                    return "#ef4444";

                case "HIGH":
                    return "#f97316";

                case "MEDIUM":
                    return "#eab308";

                default:
                    return "#22c55e";
            }
        };

    return (
        <>
            <Navbar />

            <div className="dashboard-container">

                <h1>
                    Review History
                </h1>

                {
                    reviews.length > 0 && (

                        <ScoreTrendChart
                            reviews={reviews}
                        />

                    )
                }

                {
                    reviews.map(review => {

                        let parsed = {};
                        let issues = [];

                        try {

                            parsed =
                                JSON.parse(
                                    review.reviewResult
                                );

                            issues =
                                parsed.issues || [];

                        } catch {

                            parsed = {};
                            issues = [];
                        }

                        return (

                            <div
                                key={review.id}
                                className="issue-card"
                                style={{
                                    marginTop: "20px"
                                }}
                            >

                                <h3>
                                    Score:
                                    {" "}
                                    {review.score}/10
                                </h3>

                                <p>
                                    Language:
                                    {" "}
                                    {
                                        review.language ||
                                        "Unknown"
                                    }
                                </p>

                                <p>
                                    Date:
                                    {" "}
                                    {
                                        review.reviewedAt
                                            ? new Date(
                                                review.reviewedAt
                                            ).toLocaleString()
                                            : "-"
                                    }
                                </p>

                                <h4
                                    style={{
                                        marginTop:
                                            "15px"
                                    }}
                                >
                                    Issues Found
                                </h4>

                                {
                                    issues.length ===
                                    0 && (

                                        <div>
                                            No issues
                                            recorded
                                        </div>

                                    )
                                }

                                {
                                    issues.map(
                                        (
                                            issue,
                                            index
                                        ) => (

                                            <div
                                                key={
                                                    index
                                                }
                                                style={{
                                                    marginTop:
                                                        "12px",
                                                    padding:
                                                        "12px",
                                                    background:
                                                        "#1e293b",
                                                    borderRadius:
                                                        "8px"
                                                }}
                                            >

                                                <strong>
                                                    {
                                                        issue.title
                                                    }
                                                </strong>

                                                <div>

                                                    Severity:

                                                    <span
                                                        style={{
                                                            color:
                                                                getSeverityColor(
                                                                    issue.severity
                                                                ),
                                                            fontWeight:
                                                                "bold",
                                                            marginLeft:
                                                                "6px"
                                                        }}
                                                    >

                                                        {
                                                            issue.severity
                                                        }

                                                    </span>

                                                </div>

                                                {
                                                    issue.line !==
                                                    undefined &&
                                                    issue.line !==
                                                    null && (

                                                        <div>

                                                            Line:
                                                            {" "}
                                                            {
                                                                issue.line
                                                            }

                                                        </div>

                                                    )
                                                }

                                                <div
                                                    style={{
                                                        marginTop:
                                                            "6px"
                                                    }}
                                                >
                                                    {
                                                        issue.description
                                                    }
                                                </div>

                                                <div
                                                    style={{
                                                        marginTop:
                                                            "6px"
                                                    }}
                                                >

                                                    <strong>
                                                        Fix:
                                                    </strong>
                                                    {" "}
                                                    {
                                                        issue.fix
                                                    }

                                                </div>

                                            </div>

                                        )
                                    )
                                }

                                <div
                                    style={{
                                        display:
                                            "flex",
                                        gap: "10px",
                                        marginTop:
                                            "20px"
                                    }}
                                >

                                    <button
                                        style={{
                                            padding:
                                                "10px 15px",
                                            borderRadius:
                                                "8px",
                                            border:
                                                "none",
                                            background:
                                                "#2563eb",
                                            color:
                                                "white",
                                            cursor:
                                                "pointer"
                                        }}
                                        onClick={() =>
                                            setExpandedReview(
                                                expandedReview ===
                                                    review.id
                                                    ? null
                                                    : review.id
                                            )
                                        }
                                    >

                                        {
                                            expandedReview ===
                                                review.id
                                                ? "Hide Original Code"
                                                : "Show Original Code"
                                        }

                                    </button>

                                    {
                                        parsed.improvedCode && (

                                            <button
                                                style={{
                                                    padding:
                                                        "10px 15px",
                                                    borderRadius:
                                                        "8px",
                                                    border:
                                                        "none",
                                                    background:
                                                        "#16a34a",
                                                    color:
                                                        "white",
                                                    cursor:
                                                        "pointer"
                                                }}
                                                onClick={() =>
                                                    setExpandedImprovedCode(
                                                        expandedImprovedCode ===
                                                            review.id
                                                            ? null
                                                            : review.id
                                                    )
                                                }
                                            >

                                                {
                                                    expandedImprovedCode ===
                                                        review.id
                                                        ? "Hide Improved Code"
                                                        : "Show Improved Code"
                                                }

                                            </button>

                                        )
                                    }

                                </div>

                                {
                                    expandedReview ===
                                    review.id && (

                                        <pre
                                            style={{
                                                background:
                                                    "#0f172a",
                                                color:
                                                    "#e2e8f0",
                                                padding:
                                                    "15px",
                                                borderRadius:
                                                    "8px",
                                                overflowX:
                                                    "auto",
                                                whiteSpace:
                                                    "pre-wrap",
                                                marginTop:
                                                    "15px"
                                            }}
                                        >
                                            {
                                                review.code
                                            }
                                        </pre>

                                    )
                                }

                                {
                                    expandedImprovedCode ===
                                    review.id && (

                                        <pre
                                            style={{
                                                background:
                                                    "#052e16",
                                                color:
                                                    "#dcfce7",
                                                padding:
                                                    "15px",
                                                borderRadius:
                                                    "8px",
                                                overflowX:
                                                    "auto",
                                                whiteSpace:
                                                    "pre-wrap",
                                                marginTop:
                                                    "15px"
                                            }}
                                        >
                                            {
                                                parsed.improvedCode
                                            }
                                        </pre>

                                    )
                                }

                            </div>

                        );

                    })
                }

            </div>

        </>
    );
}

export default History;