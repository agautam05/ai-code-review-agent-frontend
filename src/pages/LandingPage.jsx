import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import "./LandingPage.css";

function LandingPage() {

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalReviews: 0,
        supportedLanguages: 0
    });

    useEffect(() => {

        const loadStats = async () => {

            try {

                const response =
                    await api.get(
                        "/api/public/stats"
                    );

                setStats(
                    response.data
                );

            } catch (error) {

                console.error(error);
            }
        };

        loadStats();

    }, []);

    return (

        <div className="landing-page">

            <nav className="landing-navbar">

                <div className="logo">

                    AI Code Review Assistant

                </div>

                <div className="nav-links">

                    <a href="#features">
                        Features
                    </a>

                    <a href="#workflow">
                        Workflow
                    </a>

                    <a href="#tech">
                        Tech Stack
                    </a>

                    <Link
                        to="/login"
                        className="nav-login"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="nav-register"
                    >
                        Register
                    </Link>

                </div>

            </nav>

            <section className="hero-section">

                <div className="hero-left">

                    <span className="hero-badge">
                        Powered By Groq AI
                    </span>

                    <h1>

                        Review Code Faster.
                        <br />
                        Write Better Software.

                    </h1>

                    <p>

                        AI Code Review Assistant
                        analyzes source code,
                        identifies issues,
                        suggests improvements
                        and helps developers
                        improve code quality
                        using artificial
                        intelligence.

                    </p>

                    <div className="hero-buttons">

                        <Link
                            to="/register"
                            className="primary-btn"
                        >
                            Get Started
                        </Link>

                        <Link
                            to="/login"
                            className="secondary-btn"
                        >
                            Login
                        </Link>

                    </div>

                </div>

                <div className="hero-right">

                    <div className="preview-card">

                        <h3>
                            AI Review Result
                        </h3>

                        <div className="preview-score">
                            Score: 8.7 / 10
                        </div>

                        <ul>

                            <li>
                                Security Issue Found
                            </li>

                            <li>
                                Performance Optimization
                            </li>

                            <li>
                                Improved Code Generated
                            </li>

                            <li>
                                Suggestions Available
                            </li>

                        </ul>

                    </div>

                </div>

            </section>

            <section className="stats-section">

                <div className="stat-card">

                    <h2>
                        {stats.totalUsers}
                    </h2>

                    <p>
                        Registered Developers
                    </p>

                </div>

                <div className="stat-card">

                    <h2>
                        {stats.totalReviews}
                    </h2>

                    <p>
                        Reviews Generated
                    </p>

                </div>

                <div className="stat-card">

                    <h2>
                        {stats.supportedLanguages}
                    </h2>

                    <p>
                        Supported Languages
                    </p>

                </div>

                <div className="stat-card">

                    <h2>
                        AI
                    </h2>

                    <p>
                        Powered Analysis
                    </p>

                </div>

            </section>

            <section className="about-section">

                <h2>
                    About The Product
                </h2>

                <p>

                    AI Code Review Assistant is
                    a full-stack developer
                    productivity platform built
                    using React, Spring Boot,
                    MongoDB, JWT Security and
                    Groq AI.

                    The platform reviews source
                    code, detects bugs,
                    security vulnerabilities,
                    performance bottlenecks and
                    code quality issues while
                    generating improved code
                    suggestions and developer
                    analytics.

                </p>

            </section>

            <section
                id="features"
                className="features-section"
            >

                <h2>
                    Features
                </h2>

                <div className="features-grid">

                    <div className="feature-card">

                        <h3>
                            AI Code Analysis
                        </h3>

                        <p>
                            Detect code smells,
                            logic issues and bad
                            coding practices.
                        </p>

                    </div>

                    <div className="feature-card">

                        <h3>
                            Security Detection
                        </h3>

                        <p>
                            Identify vulnerable
                            code patterns and
                            security risks.
                        </p>

                    </div>

                    <div className="feature-card">

                        <h3>
                            Improved Code
                        </h3>

                        <p>
                            Generate optimized,
                            cleaner and more
                            maintainable code.
                        </p>

                    </div>

                    <div className="feature-card">

                        <h3>
                            Dashboard Analytics
                        </h3>

                        <p>
                            Track coding
                            weaknesses and
                            performance trends.
                        </p>

                    </div>

                    <div className="feature-card">

                        <h3>
                            Review History
                        </h3>

                        <p>
                            Access previous
                            reviews and generated
                            improvements.
                        </p>

                    </div>

                    <div className="feature-card">

                        <h3>
                            PDF Reports
                        </h3>

                        <p>
                            Export review results
                            into shareable PDF
                            reports.
                        </p>

                    </div>

                </div>

            </section>

            <section className="showcase-section">

                <h2>
                    Platform Modules
                </h2>

                <div className="showcase-grid">

                    <div className="showcase-card">

                        <h3>
                            Review Engine
                        </h3>

                        <p>
                            Submit source code
                            and receive AI
                            powered feedback.
                        </p>

                    </div>

                    <div className="showcase-card">

                        <h3>
                            Dashboard
                        </h3>

                        <p>
                            Visualize scores,
                            weaknesses and issue
                            frequency.
                        </p>

                    </div>

                    <div className="showcase-card">

                        <h3>
                            History Tracking
                        </h3>

                        <p>
                            View all previous
                            code reviews and
                            generated fixes.
                        </p>

                    </div>

                </div>

            </section>

            <section
                id="workflow"
                className="workflow-section"
            >

                <h2>
                    How It Works
                </h2>

                <div className="workflow-grid">

                    <div>
                        <h3>1</h3>
                        <p>Register</p>
                    </div>

                    <div>
                        <h3>2</h3>
                        <p>Paste Code</p>
                    </div>

                    <div>
                        <h3>3</h3>
                        <p>AI Analysis</p>
                    </div>

                    <div>
                        <h3>4</h3>
                        <p>Improve Skills</p>
                    </div>

                </div>

            </section>

            <section
                id="tech"
                className="tech-section"
            >

                <h2>
                    Technology Stack
                </h2>

                <div className="tech-grid">

                    <div>React</div>
                    <div>Vite</div>
                    <div>Spring Boot</div>
                    <div>MongoDB</div>
                    <div>JWT</div>
                    <div>Groq AI</div>

                </div>

            </section>

            <section className="cta-section">

                <h2>
                    Ready To Improve
                    Your Code?
                </h2>

                <p>

                    Join the platform and
                    start receiving AI-powered
                    code reviews today.

                </p>

                <Link
                    to="/register"
                    className="primary-btn"
                >
                    Create Account
                </Link>

            </section>

            <footer className="landing-footer">

                <div>

                    <h3>
                        AI Code Review Assistant
                    </h3>

                    <p>
                        Intelligent code quality
                        platform powered by AI.
                    </p>

                </div>

                <div>

                    <h4>
                        Technologies
                    </h4>

                    <p>
                        React
                    </p>

                    <p>
                        Spring Boot
                    </p>

                    <p>
                        MongoDB
                    </p>

                    <p>
                        Groq AI
                    </p>

                </div>

                <div>

                    <h4>
                        Features
                    </h4>

                    <p>
                        Review Engine
                    </p>

                    <p>
                        Dashboard
                    </p>

                    <p>
                        History
                    </p>

                    <p>
                        PDF Export
                    </p>

                </div>

            </footer>

        </div>

    );
}

export default LandingPage;