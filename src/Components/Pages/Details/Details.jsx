import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPostAndCommentsById } from "../../../APIs/postsApis";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.postsData.post);
  const comments = useSelector((state) => state.postsData.postComments);

  const [loading, setLoading] = useState(true);

  if (loading) {
    return <div className="loader"></div>; // Show loading message
  }

  console.log(post);

  useEffect(() => {
    dispatch(fetchPostAndCommentsById({ id })).then(() => {});
  }, []);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.description}</p>

      <p>{comments}</p>
    </div>
  );
};

export default Details;
