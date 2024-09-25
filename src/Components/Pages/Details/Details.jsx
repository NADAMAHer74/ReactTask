import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPostAndCommentsById } from "../../../APIs/postsApis";
import "./style.css";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.postsData.post);
  const comments = useSelector((state) => state.postsData.comments);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchPostAndCommentsById({ id })).then(() => {
      setLoading(false);
    });
  }, [,]);

  if (loading) {
    return <div className="loader"></div>; // Show loading message
  }

  return (
    <>
      <div className="post-details">
        <h1 className="post-title">{post.title}</h1>
        <p>{post.body}</p>
      </div>

      <div className="comments-section">
        <h3>Comments</h3>

        {comments.length > 0 ? (
          comments.map((comment) => (
            <div className="comment-item" key={comment.id}>
              <p>
                <strong>{comment.name}:</strong> {comment.body}
              </p>
            </div>
          ))
        ) : (
          <p>No comments available.</p>
        )}
      </div>
    </>
  );
};

export default Details;
