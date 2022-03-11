import React from "react";
import Comment from "./comment.component";

export default function CommentList(props) {
  return (
    props.comments ?
    <div className="commentList">
      <h5 className="text-muted mb-4">
        {" "}
        Comment{props.comments.length > 0 ? "s: " : ""}
        <span>{props.comments.length}</span>
      </h5>

      {props.comments.length === 0 && !props.loading ? (
        <div className="alert text-center alert-info">
          Be the first to comment
        </div>
      ) : null}

      {props.comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </div> 
    : 
    <div></div>
  );
}