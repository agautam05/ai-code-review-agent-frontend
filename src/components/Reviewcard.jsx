function ReviewCard({ score = 0 }) {
  let status = "Needs Improvement";
  let color = "#ef4444";
  let emoji = "🔴";

  if (score >= 8) {
    status = "Excellent";
    color = "#22c55e";
    emoji = "🟢";
  } else if (score >= 5) {
    status = "Good";
    color = "#f59e0b";
    emoji = "🟡";
  }

  return (
    <div
      style={{
        background: "#1e293b",
        padding: "25px",
        borderRadius: "16px",
        marginTop: "20px",
        textAlign: "center",
        border: `2px solid ${color}`,
        boxShadow: `0 0 15px ${color}40`
      }}
    >
      <h2
        style={{
          marginBottom: "10px",
          color: "#e2e8f0"
        }}
      >
        Review Score
      </h2>

      <h1
        style={{
          color,
          fontSize: "64px",
          margin: "10px 0"
        }}
      >
        {score}/10
      </h1>

      <p
        style={{
          color,
          fontWeight: "bold",
          fontSize: "22px",
          marginBottom: "10px"
        }}
      >
        {emoji} {status}
      </p>

      <div
        style={{
          width: "100%",
          height: "12px",
          background: "#334155",
          borderRadius: "999px",
          overflow: "hidden",
          marginTop: "15px"
        }}
      >
        <div
          style={{
            width: `${score * 10}%`,
            height: "100%",
            background: color,
            transition: "0.5s"
          }}
        />
      </div>

      <p
        style={{
          marginTop: "15px",
          color: "#94a3b8",
          fontSize: "14px"
        }}
      >
        Code Quality Assessment
      </p>
    </div>
  );
}

export default ReviewCard;