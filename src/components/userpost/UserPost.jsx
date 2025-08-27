import { useState } from "react";
import Post from "../post/Post";
import { deletePost, updatePost } from "../../services/api";
import "./UserPost.css";

export default function UserPost({ post, onDelete, onUpdate }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [form, setForm] = useState({
    title: post.title,
    description: post.description,
  });
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deletePost(post.id);
      if (onDelete) onDelete(post.id);
      setShowConfirm(false);
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updatePost(post.id, form);
      if (onUpdate) onUpdate({ ...post, ...form });
      setShowUpdate(false);
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-post-wrapper">
      <Post post={post} />

      <div className="user-post-actions">
        <button onClick={() => setShowUpdate(true)}>Update</button>
        <button onClick={() => setShowConfirm(true)}>Delete</button>
      </div>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Are you sure you want to delete this post?</p>
            <div className="dialog-actions">
              <button onClick={handleDelete} disabled={loading}>
                {loading ? "Deleting..." : "Yes"}
              </button>
              <button onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showUpdate && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Update Post</h3>
            <input
              type="text"
              placeholder="Update title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              placeholder="Update description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <div className="dialog-actions">
              <button onClick={handleUpdate} disabled={loading}>
                {loading ? "Updating..." : "Save"}
              </button>
              <button onClick={() => setShowUpdate(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
