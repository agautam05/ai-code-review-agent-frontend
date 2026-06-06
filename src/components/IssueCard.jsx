function IssueCard({ issue }) {

    return (
        <div
            style={{
                background: "#252525",
                padding: "12px",
                margin: "10px 0",
                borderRadius: "8px",
                border: "1px solid #444"
            }}
        >
            {issue}
        </div>
    );
}

export default IssueCard;