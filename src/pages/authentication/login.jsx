import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./login.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate("/");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Log In</h1>

        <p className="signup-text">
          Don't have an account?
          <a href="/signup" className="signup-link">
            Create an account
          </a>
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <VisibilityIcon style={{ fontSize: 18 }} />
              ) : (
                <VisibilityOffIcon style={{ fontSize: 18 }} />
              )}
            </span>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
