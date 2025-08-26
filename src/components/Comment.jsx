import "./Comment.css";

export default function Comment({ comment }) {
  return (
    <div className="comment-card">
      <div className="comment-header">
        <div className="comment-avatar">
          {comment.authorName?.[0]?.toUpperCase()}
        </div>
        <div className="comment-author">{comment.authorName}</div>
      </div>
      <div className="comment-text">{comment.comment}</div>
    </div>
  );
}
