import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "./authSlice";
import "../../App.css";



function validate({ username, password }) {
    const errors = {};

    if (!username.trim()) {
        errors.username = "Enter your email address";
    }

    if (!password) {
        errors.password = "Enter your password";
    } else if (password.length < 8) {
        errors.password = "Password must be at least 8 characters";
    }
    return errors;
}

// Replace with a real request to your auth endpoint.
function signIn({ username, password }) {
    return new Promise((resolve) => setTimeout(resolve, 1000));
}


export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);

    const [searchParams] = useSearchParams();
    const [values, setValues] = useState({ username: "", password: "", remember: false });
    const [errors, setErrors] = useState({});
    const [toast, setToast] = useState(null);
    const role = searchParams.get("role") || "tenant";

    // Hide the toast automatically after 3 seconds
    useEffect(() => {
        if (!toast) return;
        const id = setTimeout(() => setToast(null), 3000);
        return () => clearTimeout(id);
    }, [toast]);

    const handleChange = (field) => (e) => {
        const value = field === "remember" ? e.target.checked : e.target.value;
        setValues((v) => ({ ...v, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setToast(null);

        const found = validate(values);
        setErrors(found);
        if (Object.keys(found).length) {
            setToast({ type: "error", text: "Please fix the errors and try again." });
            return;
        }

        dispatch(loginStart());
        try {
            await signIn(values);
            dispatch(loginSuccess({ username: values.username }));

            setToast({ type: "success", text: "Signed in successfully." });

            setTimeout(() => {
                navigate("/user");
            }, 3000);
        } catch {
            dispatch(loginFailure("Sign in failed. Please try again."));
            setToast({ type: "failure", text: "Sign in failed. Please try again." });
        }
    };

    return (
        <div className="login-page">
            <form className="login-card" onSubmit={handleSubmit} noValidate>
                <h1 className="login-title">Sign in</h1>
                <p className="login-subtitle">Welcome back. Enter your details to continue.</p>

                <div className="login-field">
                    <label className="login-label" htmlFor="username">UserName</label>
                    <input
                        id="username"
                        className="login-input"
                        type="username"
                        autoComplete="username"
                        placeholder="Enter your username"
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
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={handleChange("password")}
                        aria-invalid={Boolean(errors.password)}
                    />
                    {errors.password && <p className="login-error">{errors.password}</p>}
                </div>

                <div className="login-options">
                    <label className="login-remember">
                        <input type="checkbox" checked={values.remember} onChange={handleChange("remember")} />
                        Remember me
                    </label>
                    <a className="login-link" href="#forgot">Forgot password?</a>
                </div>

                <button className="login-button" type="submit" disabled={loading || !values.username || !values.password}>
                    {loading ? "Signing in..." : "Sign in"}
                </button>

                <p className="login-footer">
                    Don't have an account? <Link className="login-link" to={`/signup?role=${role}`}>Register Here</Link>
                </p>
            </form>
            {toast && (
                <div className={`toast toast-${toast.type}`} role="status" aria-live="polite">
                    <span>{toast.text}</span>
                    <button className="toast-close" type="button" aria-label="Dismiss" onClick={() => setToast(null)}>
                        ×
                    </button>
                </div>
            )}
        </div>
    );
}