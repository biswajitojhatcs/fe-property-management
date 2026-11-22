import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "../../App.css";


const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ name, email, password, confirm, terms }) {
    const errors = {};
    if (!name.trim()) {
        errors.name = "Enter your full name";
    }

    if (!email.trim()) {
        errors.email = "Enter your email address";
    } else if (!EMAIL_RE.test(email.trim())) {
        errors.email = "Enter a valid email address";
    }

    if (!password) {
        errors.password = "Create a password";
    } else if (password.length < 8) {
        errors.password = "Password must be at least 8 characters";
    }

    if (!confirm) {
        errors.confirm = "Confirm your password";
    } else if (confirm !== password) {
        errors.confirm = "Passwords don't match";
    }

    if (!terms) {
        errors.terms = "You need to accept the terms to continue";
    }
    return errors;
}

// Replace with a real request to your registration endpoint.
function signUp({ name, email, password }) {
    return new Promise((resolve) => setTimeout(resolve, 1000));
}


export default function SignUp() {
    const [values, setValues] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirm: "",
        terms: false,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const role = searchParams.get("role") || "tenant";

    const handleChange = (field) => (e) => {
        const value = field === "terms" ? e.target.checked : e.target.value;
        setValues((v) => ({ ...v, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);

        const found = validate(values);
        if (Object.keys(found).length) return;

        setLoading(true);
        try {
            await signUp(values);
            setStatus({ type: "success", text: "Account created. Welcome aboard!" });
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } catch {
            setStatus({ type: "failure", text: "Sign up failed. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-page">
            <form className="signup-card" onSubmit={handleSubmit} noValidate>
                <h1 className="login-title">Create account</h1>
                <p className="login-subtitle">Sign up to get started. It only takes a minute.</p>

                <div className="login-field">
                    <label className="login-label" htmlFor="name">Full name</label>
                    <input
                        id="name"
                        className="login-input"
                        type="text"
                        autoComplete="name"
                        placeholder="Jane Doe"
                        value={values.name}
                        onChange={handleChange("name")}
                        aria-invalid={Boolean(errors.name)}
                    />
                    {errors.name && <p className="login-error">{errors.name}</p>}
                </div>

                <div className="login-field">
                    <label className="login-label" htmlFor="email">Email</label>
                    <input
                        id="email"
                        className="login-input"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={values.email}
                        onChange={handleChange("email")}
                        aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email && <p className="login-error">{errors.email}</p>}
                </div>

                <div className="login-field">
                    <label className="login-label" htmlFor="username">User Name</label>
                    <input
                        id="username"
                        className="login-input"
                        type="username"
                        autoComplete="username"
                        placeholder="jane@doe"
                        value={values.username}
                        onChange={handleChange("username")}
                        aria-invalid={Boolean(errors.username)}
                    />
                    {errors.username && <p className="login-error">{errors.username}</p>}
                </div>

                <div className="login-field">
                    <label className="login-label" htmlFor="password">Password</label>
                    <input
                        id="password"
                        className="login-input"
                        type="password"
                        autoComplete="new-password"
                        placeholder="At least 8 characters"
                        value={values.password}
                        onChange={handleChange("password")}
                        aria-invalid={Boolean(errors.password)}
                    />
                    {errors.password && <p className="login-error">{errors.password}</p>}
                </div>

                <div className="login-field">
                    <label className="login-label" htmlFor="confirm">Confirm password</label>
                    <input
                        id="confirm"
                        className="login-input"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Re-enter your password"
                        value={values.confirm}
                        onChange={handleChange("confirm")}
                        aria-invalid={Boolean(errors.confirm)}
                    />
                    {errors.confirm && <p className="login-error">{errors.confirm}</p>}
                </div>

                <div className="login-field">
                    <label className="login-remember">
                        <input type="checkbox" checked={values.terms} onChange={handleChange("terms")} />
                        <span>
                            I agree to the <a className="login-link" href="#terms">Terms</a> and{" "}
                            <a className="login-link" href="#privacy">Privacy Policy</a>
                        </span>
                    </label>
                    {errors.terms && <p className="login-error">{errors.terms}</p>}
                </div>

                <button className="login-button" type="submit" disabled={loading || !values.name.trim() || !values.username.trim() || !values.email.trim() || !values.password.trim() || !values.confirm.trim()}>
                    {loading ? "Creating account..." : "Create account"}
                </button>

                <p className={`login-status ${status?.type ?? ""}`} role="status" aria-live="polite">
                    {status?.text}
                </p>

                <p className="signup-footer">
                    Already have an account? <Link className="signup-link" to={`/login?role=${role}`}>Sign In</Link>
                </p>
            </form>
        </div>
    );
}