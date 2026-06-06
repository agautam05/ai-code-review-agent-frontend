import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

function IssueChart({ issues = {} }) {

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

    const data = Object.entries(
        issues || {}
    ).map(
        ([name, count]) => ({

            name:
                formatIssue(name),

            count

        })
    );

    if (data.length === 0) {

        return (

            <div
                style={{
                    background:
                        "linear-gradient(135deg,#111827,#1e293b)",
                    padding: "24px",
                    borderRadius: "20px",
                    border: "1px solid #334155",
                    height: "100%",
                    boxShadow:
                        "0 8px 24px rgba(0,0,0,0.25)"
                }}
            >

                <h2
                    style={{
                        marginBottom: "20px",
                        color: "#f8fafc"
                    }}
                >
                    📊 Issue Frequency
                </h2>
                <p>
                    No issue data available.
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
                marginTop: "30px",
                border: "1px solid #334155"
            }}
        >

            <h2>
                Issue Frequency
            </h2>

            <ResponsiveContainer
                width="100%"
                height={
                    Math.max(
                        260,
                        data.length * 40
                    )
                }
            >

                <BarChart
                    layout="vertical"
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 180,
                        bottom: 20
                    }}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        type="number"
                        stroke="#ffffff"
                    />

                    <YAxis
                        type="category"
                        dataKey="name"
                        stroke="#ffffff"
                        width={170}
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

                    <Bar
                        dataKey="count"
                        fill="#3b82f6"
                        radius={[
                            0,
                            6,
                            6,
                            0
                        ]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );
}

export default IssueChart;