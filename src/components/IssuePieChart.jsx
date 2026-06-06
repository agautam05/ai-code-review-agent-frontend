import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#f97316",
    "#84cc16"
];

function IssuePieChart({ issues = {} }) {

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
        ([name, value]) => ({
            name: formatIssue(name),
            value
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
                    🥧 Issue Distribution
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
                Issue Distribution
            </h2>

            <ResponsiveContainer
                width="100%"
                height={280}
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="40%"
                        cy="50%"
                        outerRadius={90}
                        label={false}
                    >

                        {
                            data.map(
                                (_, index) => (

                                    <Cell
                                        key={index}
                                        fill={
                                            COLORS[
                                            index %
                                            COLORS.length
                                            ]
                                        }
                                    />

                                )
                            )
                        }

                    </Pie>

                    <Tooltip
                        formatter={
                            (value, name) => [
                                value,
                                name
                            ]
                        }
                        contentStyle={{
                            background:
                                "#111827",
                            border:
                                "1px solid #334155",
                            color:
                                "#ffffff"
                        }}
                    />

                    <Legend
                        verticalAlign="bottom"
                        height={60}
                    />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );
}

export default IssuePieChart;