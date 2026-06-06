import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

function ScoreTrendChart({
    reviews = []
}) {

    const data = reviews.map(
        (review, index) => ({
            review: index + 1,
            score: review.score || 0
        })
    );

    if (data.length === 0) {

        return (

            <div
                style={{
                    background: "#111827",
                    padding: "20px",
                    borderRadius: "12px",
                    marginBottom: "30px",
                    border: "1px solid #334155"
                }}
            >

                <h2>
                    Score Trend
                </h2>

                <p>
                    No review history available.
                </p>

            </div>

        );
    }

    return (

        <div
            style={{
                background: "#111827",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "30px",
                border: "1px solid #334155"
            }}
        >

            <h2>
                Score Trend
            </h2>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <LineChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 10,
                        bottom: 10
                    }}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        dataKey="review"
                        stroke="#ffffff"
                    />

                    <YAxis
                        domain={[0, 10]}
                        stroke="#ffffff"
                    />

                    <Tooltip
                        contentStyle={{
                            background:
                                "#111827",
                            border:
                                "1px solid #334155",
                            color:
                                "#ffffff"
                        }}
                    />

                    <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{
                            r: 5
                        }}
                        activeDot={{
                            r: 7
                        }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );
}

export default ScoreTrendChart;