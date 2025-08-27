import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import UserPost from "../../components/userpost/UserPost";
import { getMyPosts } from "../../services/api";
import "./Profile.css";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      const data = await getMyPosts();
      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
    setMessage("Post deleted successfully");
    setTimeout(() => setMessage(""), 2000);
  };

  const handleUpdate = (updatedPost) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
    setMessage("Post updated successfully");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="user-posts-page">
      <Sidebar />
      <div className="user-posts-container">
        <h2>Your Posts</h2>
        {loading ? (
          <p className="no-posts">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="no-posts">You haven't created any posts yet</p>
        ) : (
          posts.map((post) => (
            <UserPost
              key={post.id}
              post={post}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))
        )}

        {message && <div className="feedback-toast">{message}</div>}
      </div>
    </div>
  );
}
