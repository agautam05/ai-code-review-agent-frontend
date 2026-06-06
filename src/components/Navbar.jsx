import { Link, useNavigate } from "react-router-dom";
import {
    FaCode,
    FaChartLine,
    FaHistory,
    FaUsers,
    FaSignOutAlt
} from "react-icons/fa";

function Navbar() {

    const navigate = useNavigate();

    const token =
        localStorage.getItem(
            "token"
        );

    const role =
        localStorage.getItem(
            "role"
        );

    const logout = () => {

        localStorage.clear();

        navigate("/");
    };
    const navLinkStyle = {
  color: "#ffffff",
  textDecoration: "none",
  fontWeight: "500",
  display: "flex",
  alignItems: "center",
  gap: "6px"
};

    return (

        <nav

            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "18px 30px",
                background:
                    "linear-gradient(90deg,#0f172a,#1e293b)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                color: "#ffffff",
                borderBottom: "1px solid #334155",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                width: "100%",
                zIndex: 9999,
                boxSizing: "border-box"
            }}
        >

            <div>

                <h2
                    style={{
                        margin: 0,
                        color: "#60a5fa",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                    }}
                >
                    <FaCode />
                    AI Code Review Assistant
                </h2>

                <small
                    style={{
                        color: "#94a3b8"
                    }}
                >
                    {
                        role === "ADMIN"
                            ? "Administration Panel"
                            : "Multi-Language Reviewer"
                    }
                </small>

            </div>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center"
                }}
            >

                {
                    role === "ADMIN" && (

                        <>

                            <Link
    to="/admin"
    style={navLinkStyle}
>
                                <>
                                    <FaChartLine />
                                    Dashboard
                                </>
                            </Link>

                            <Link
                                to="/admin/users"
                                style={{
                                    color: "#ffffff",
                                    textDecoration: "none",
                                    fontWeight: "500",display: "flex",
alignItems: "center",
gap: "6px",
                                }}
                            >
                               <>
  <FaUsers />
  Users
</>
                            </Link>

                            <Link
                                to="/admin/reviews"
                                style={{
                                    color: "#ffffff",
                                    textDecoration: "none",
                                    fontWeight: "500"
                                }}
                            >
                                Reviews
                            </Link>

                        </>

                    )
                }

                {
                    role !== "ADMIN" && token && (

                        <>

                            <Link
                                to="/review"
                                style={{
                                    color: "#ffffff",
                                    textDecoration: "none",
                                    fontWeight: "500"
                                }}
                            >
                                Review
                            </Link>

                            <Link
                                to="/dashboard"
                                style={{
                                    color: "#ffffff",
                                    textDecoration: "none",
                                    fontWeight: "500"
                                }}
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/history"
                                style={{
                                    color: "#ffffff",
                                    textDecoration: "none",
                                    fontWeight: "500",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                }}
                            >
                                <>
                                    <FaHistory />
                                    History
                                </>
                            </Link>

                        </>

                    )
                }

                {
                    !token && (

                        <>

                            <Link
                                to="/login"
                                style={{
                                    color: "#22c55e",
                                    textDecoration: "none",
                                    fontWeight: "600"
                                }}
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                style={{
                                    color: "#3b82f6",
                                    textDecoration: "none",
                                    fontWeight: "600"
                                }}
                            >
                                Register
                            </Link>

                        </>

                    )
                }

                {
                    token && (

                        <button
                            onClick={logout}
                            style={{
                                padding: "8px 16px",
                                border: "none",
                                borderRadius: "8px",
                                background: "#ef4444",
                                color: "white",
                                cursor: "pointer",
                                fontWeight: "600",
                                display: "flex",
alignItems: "center",
gap: "8px",
transition: "0.3s",
                            }}
                        >
                            <>
  <FaSignOutAlt />
  Logout
</>
                        </button>

                    )
                }

            </div>

        </nav>

    );
}

export default Navbar;