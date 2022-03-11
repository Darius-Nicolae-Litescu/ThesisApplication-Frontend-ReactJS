import React from "react";
import Comment from "./comment.component";
import AddComment from "./add-comment-story-task.form";
import { useState, useEffect } from 'react';

export const CommentList = (props) => {
  const { storyTaskId: storyTaskId, loading: loading, comments: passedComments } = props;

  const [comments, setComments] = useState(passedComments);

  useEffect(() => {
    setComments(passedComments)
  }, [passedComments])

  const refreshComments = async (response) => {
    if (response != null) {
      let comments = response.storyComments;
      setComments(comments)
    }
  }

  return (
    comments ?
      <div className="commentList">
        <h5 className="text-muted mb-4">
          <AddComment refreshComments={refreshComments} storyTaskId={storyTaskId}></AddComment>
          <br></br>
          {" "}
          Comment{comments.length > 0 ? "s: " : ":"}
          <span> {comments.length}</span>
        </h5>

        {comments.length === 0 && !loading ? (
          <div className="alert text-center alert-info">
            Be the first to comment
          </div>
        ) : null}

        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>
      :
      <div></div>
  );
}