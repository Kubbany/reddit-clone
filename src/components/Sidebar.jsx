import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar({ onOpenCreatePost }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <FaUserCircle className="sidebar-icon" />
        <p className="sidebar-username">{user?.name}</p>
        <p className="sidebar-email">{user?.email}</p>
      </div>

      <div className="sidebar-menu">
        <Link to="/posts" className="sidebar-btn">Posts</Link>
        <button className="sidebar-btn" onClick={onOpenCreatePost}>Create Post</button>
        <Link to="/profile" className="sidebar-btn">Your Profile</Link>
      </div>

      <button className="sidebar-logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
