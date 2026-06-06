import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

function Register() {

    const navigate = useNavigate();

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const register = async (e) => {

        e.preventDefault();

        if (!name.trim()) {

            alert("Enter name");
            return;
        }

        if (!email.trim()) {

            alert("Enter email");
            return;
        }

        if (!password.trim()) {

            alert("Enter password");
            return;
        }

        if (password.length < 6) {

            alert(
                "Password must be at least 6 characters"
            );
            return;
        }

        try {

            setLoading(true);

            const response =
                await api.post(
                    "/api/auth/register",
                    {
                        name,
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

            navigate("/review");

        } catch (error) {

            console.error(error);

            const message =
                error.response?.data?.message
                ||
                error.response?.data
                ||
                "Registration failed";

            alert(message);
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
                border: "1px solid #334155"
            }}
        >

            <h1>
                Register
            </h1>

            <form
                onSubmit={register}
            >

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) =>
                        setName(
                            e.target.value
                        )
                    }
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "15px",
                        borderRadius: "8px"
                    }}
                />

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
                        borderRadius: "8px"
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
                        borderRadius: "8px"
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
                        background: "#16a34a",
                        color: "white",
                        cursor: "pointer"
                    }}
                >
                    {
                        loading
                            ? "Creating Account..."
                            : "Register"
                    }
                </button>

            </form>

            <p
                style={{
                    marginTop: "20px"
                }}
            >
                Already have an account?{" "}
                <Link to="/login">
                    Login
                </Link>
            </p>

        </div>

    );
}

export default Register;