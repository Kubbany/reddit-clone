import { useState } from "react";
import { FaArrowUp, FaArrowDown, FaComment } from "react-icons/fa";
import "./Post.css";
import { votePost } from "../services/api";
import CommentModal from "./CommentModal";

export default function Post({ post }) {
  const [votes, setVotes] = useState(post.voteCount ?? 0);
  const [loading, setLoading] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const handleVote = async (value) => {
    try {
      setLoading(true);
      await votePost(post.id, value);
      setVotes((prev) => prev + value);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-avatar">{post.authorName?.[0]?.toUpperCase()}</div>
        <div className="post-author">{post.authorName}</div>
      </div>

      <h3 className="post-title">{post.title}</h3>
      <div className="post-description">{post.description}</div>

      {post.imageUrl && (
        <img src={post.imageUrl} alt="Post" className="post-image" />
      )}

      <div className="post-actions">
        <button onClick={() => handleVote(1)} disabled={loading}>
          <FaArrowUp />
        </button>
        <span>{votes}</span>
        <button onClick={() => handleVote(-1)} disabled={loading}>
          <FaArrowDown />
        </button>
        <button onClick={() => setIsCommentOpen(true)}>
          <FaComment />
        </button>
      </div>

      {/* Comment Modal */}
      <CommentModal
        isOpen={isCommentOpen}
        onClose={() => setIsCommentOpen(false)}
        post={post}
      />
    </div>
  );
}
