/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { registerUser } from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./signup.css"; 
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords Do Not Match!");
      return;
    }

    try {
      const res = await registerUser({ name, email, password });
      navigate("/login");
    } catch (err) {
      setError("Registration Failed. Try Again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Sign Up</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="signup-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            className="signup-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="signup-input"
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

          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="signup-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? (
                <VisibilityIcon style={{ fontSize: 18 }} />
              ) : (
                <VisibilityOffIcon style={{ fontSize: 18 }} />
              )}
            </span>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
