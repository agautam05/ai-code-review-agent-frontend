import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const login = async (e) => {

        e.preventDefault();

        if (!email.trim()) {

            alert("Enter email");
            return;
        }

        if (!password.trim()) {

            alert("Enter password");
            return;
        }

        try {

            setLoading(true);

            const response =
                await api.post(
                    "/api/auth/login",
                    {
                        email,
                        password
                    }
                );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "userEmail",
                response.data.email
            );

            localStorage.setItem(
                "userName",
                response.data.name
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            if (
                response.data.role === "ADMIN"
            ) {

                navigate("/admin");

            } else {

                navigate("/review");
            }

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Login failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div
            style={{
                maxWidth: "450px",
                margin: "60px auto",
                background: "#111827",
                padding: "30px",
                borderRadius: "12px",
                border: "1px solid #334155",
                color: "white"
            }}
        >

            <h1>
                Login
            </h1>

            <form
                onSubmit={login}
            >

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "15px",
                        borderRadius: "8px",
                        boxSizing: "border-box"
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "15px",
                        borderRadius: "8px",
                        boxSizing: "border-box"
                    }}
                />

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        marginTop: "20px",
                        padding: "12px",
                        border: "none",
                        borderRadius: "8px",
                        background: "#2563eb",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "600"
                    }}
                >
                    {
                        loading
                            ? "Logging in..."
                            : "Login"
                    }
                </button>

            </form>

            <p
                style={{
                    marginTop: "20px",
                    textAlign: "center"
                }}
            >
                Don't have an account?{" "}
                <Link
                    to="/register"
                    style={{
                        color: "#60a5fa"
                    }}
                >
                    Register
                </Link>
            </p>

        </div>

    );
}

export default Login;