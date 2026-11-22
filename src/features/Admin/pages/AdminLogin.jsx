import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../store/authSlice";
import "../admin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("admin@tenantapp.in");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace this block with your real API login response
    if (email.trim() && password === "admin123") {
      dispatch(
        loginSuccess({
          user: { name: "Property Admin", email },
          role: "admin",
        })
      );
      navigate("/admin/dashboard", { replace: true });
    } else {
      setError("Invalid credentials. Try password: admin123");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>

        {error && <p className="error-text">{error}</p>}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-primary" style={{ width: "100%" }}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;