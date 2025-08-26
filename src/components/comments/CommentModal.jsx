/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Comment from "./Comment";
import "./CommentModal.css";
import { createComment, getCommentsByPostId } from "../../services/api";

export default function CommentModal({ isOpen, onClose, post }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen]);

  const fetchComments = async () => {
    try {
      const res = await getCommentsByPostId(post.id);
      setComments(res.data);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      setLoading(true);
      await createComment({ postId: post.id, comment: newComment });
      setNewComment("");
      setMessage({ type: "success", text: "Comment added successfully!" });
      fetchComments();
    } catch (err) {
      console.error("Failed to add comment", err);
      setMessage({ type: "error", text: "Failed to add comment." });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000); 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Comments</h3>

        <div className="comment-input-container">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <button onClick={handleAddComment} disabled={loading}>
            {loading ? "Posting..." : "Submit"}
          </button>
        </div>

        {message && (
          <p className={`message ${message.type}`}>{message.text}</p>
        )}

        <div className="comments-list">
          {comments.length === 0 ? (
            <p className="no-comments">No comments yet</p>
          ) : (
            comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))
          )}
        </div>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
