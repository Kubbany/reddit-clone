import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import CreatePostModal from "./CreatePostModal";
import "./Sidebar.css";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-profile">
        <p className="sidebar-username">{user?.name}</p>
        <p className="sidebar-email">{user?.email}</p>
      </div>

      <div className="sidebar-menu">
        <Link to="/posts" className="sidebar-btn">Posts</Link>
        <button onClick={() => setIsModalOpen(true)} className="sidebar-btn">Create Post</button>
        <Link to="/profile" className="sidebar-btn">Your Profile</Link>
      </div>

      <button className="sidebar-logout" onClick={handleLogout}>
        Logout
      </button>

      {isModalOpen && <CreatePostModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
