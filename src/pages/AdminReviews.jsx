import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";

function AdminReviews() {

    const [reviews, setReviews] =
        useState([]);

    const [filteredReviews, setFilteredReviews] =
        useState([]);

    const [languageFilter, setLanguageFilter] =
        useState("ALL");

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchReviews();

    }, []);

    useEffect(() => {

        if (
            languageFilter === "ALL"
        ) {

            setFilteredReviews(
                reviews
            );

            return;
        }

        setFilteredReviews(

            reviews.filter(

                review =>

                    review.language ===
                    languageFilter
            )

        );

    }, [languageFilter, reviews]);

    const fetchReviews = async () => {

        try {

            const response =
                await api.get(
                    "/api/admin/reviews"
                );

            setReviews(
                response.data
            );

            setFilteredReviews(
                response.data
            );

        } catch (error) {

            console.error(error);

            alert(
                "Failed to load reviews"
            );

        } finally {

            setLoading(false);
        }
    };

    const deleteReview = async (
        id
    ) => {

        const confirmed =
            window.confirm(
                "Delete this review?"
            );

        if (!confirmed)
            return;

        try {

            await api.delete(
                `/api/admin/reviews/${id}`
            );

            fetchReviews();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message
                ||
                "Delete failed"
            );
        }
    };

    const languages =
        [
            "ALL",
            ...new Set(
                reviews.map(
                    review =>
                        review.language
                )
            )
        ];

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
                        Loading Reviews...
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
                    Review Management
                </h1>

                <select
                    value={
                        languageFilter
                    }
                    onChange={(e) =>
                        setLanguageFilter(
                            e.target.value
                        )
                    }
                    style={{
                        marginTop: "20px",
                        marginBottom: "30px",
                        padding: "12px",
                        borderRadius: "8px"
                    }}
                >

                    {
                        languages.map(
                            language => (

                                <option
                                    key={
                                        language
                                    }
                                    value={
                                        language
                                    }
                                >
                                    {
                                        language
                                    }
                                </option>

                            )
                        )
                    }

                </select>

                <div
                    style={{
                        overflowX: "auto"
                    }}
                >

                    <table
                        style={{
                            width: "100%",
                            borderCollapse:
                                "collapse"
                        }}
                    >

                        <thead>

                            <tr>

                                <th style={thStyle}>
                                    User Id
                                </th>

                                <th style={thStyle}>
                                    Language
                                </th>

                                <th style={thStyle}>
                                    Score
                                </th>

                                <th style={thStyle}>
                                    Date
                                </th>

                                <th style={thStyle}>
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                filteredReviews.map(
                                    review => (

                                        <tr
                                            key={
                                                review.reviewId
                                            }
                                        >

                                            <td style={tdStyle}>
                                                {
                                                    review.userId
                                                }
                                            </td>

                                            <td style={tdStyle}>
                                                {
                                                    review.language
                                                }
                                            </td>

                                            <td style={tdStyle}>
                                                {
                                                    review.score
                                                }
                                            </td>

                                            <td style={tdStyle}>
                                                {
                                                    review.reviewedAt
                                                        ?.substring(
                                                            0,
                                                            10
                                                        )
                                                }
                                            </td>

                                            <td style={tdStyle}>

                                                <button
                                                    onClick={() =>
                                                        deleteReview(
                                                            review.reviewId
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

export default AdminReviews;