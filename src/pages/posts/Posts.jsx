import { useEffect, useState } from "react";
import { getPosts } from "../../services/api";
import Sidebar from "../../components/Sidebar";
import Post from "../../components/Post";
import "./Posts.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

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
          {/* here you can render your CreatePost component */}
          <button onClick={() => setShowCreateModal(false)}>Close</button>
        </div>
      )}
    </div>
  );
}
