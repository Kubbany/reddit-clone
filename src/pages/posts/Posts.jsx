import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPosts } from "../../services/api";
import Sidebar from "../../components/sidebar/Sidebar";
import Post from "../../components/post/Post";
import "./Posts.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // ✅ For toast message after navigation
  const location = useLocation();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle toast message when navigated here with state
  useEffect(() => {
    if (location.state?.message) {
      setToastMessage(location.state.message);

      const timer = setTimeout(() => {
        setToastMessage("");
        // Clear the state so the toast doesn’t show again on refresh
        navigate(location.pathname, { replace: true });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  return (
    <div className="posts-page">
      <Sidebar onOpenCreatePost={() => setShowCreateModal(true)} />
      <div className="posts-container">
        <h2>Posts</h2>
        {loading ? (
          <p className="no-posts">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="no-posts">No Posts Yet</p>
        ) : (
          posts.map((post) => (
            <Post key={post.id} post={post} refreshPosts={fetchPosts} />
          ))
        )}
      </div>

      {showCreateModal && (
        <div className="modal">
          <button onClick={() => setShowCreateModal(false)}>Close</button>
        </div>
      )}

      {/* ✅ Toast message */}
      {toastMessage && (
        <div className="toast-message">
          <p>{toastMessage}</p>
        </div>
      )}
    </div>
  );
}
