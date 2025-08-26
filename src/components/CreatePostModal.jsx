import { useState } from "react";
import "./CreatePostModal.css";

export default function CreatePostModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const res = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      const data = await res.json();
      setMessage(data.message || "Post created successfully");
    } catch {
      setMessage("Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create Post</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            placeholder="Title"
            className="modal-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className="modal-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            className="modal-input"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button type="submit" className="modal-submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
        {message && <p className="modal-message">{message}</p>}
        <button className="modal-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
