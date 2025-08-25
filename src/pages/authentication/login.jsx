import  { useState } from "react";
import Logo from "../logo/logo.js";
import "./login.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
    
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

        <form>
          <input
            type="text"
            placeholder="Email/Username"
            className="login-input"
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="login-input"
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityIcon style={{ fontSize: 18 }} /> 
              : 
              <VisibilityOffIcon style={{ fontSize: 18 }} />}
            </span>
          </div>

          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
