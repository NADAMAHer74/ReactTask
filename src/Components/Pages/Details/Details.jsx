import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../../../APIs/postsApis";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.postsData.post);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <div className="loader"></div>; // Show loading message
  }

  console.log(post);

  //   const [currentPost, setCurrentPost] = useState({
  //     title: "",
  //     body: "",
  //   });

  useEffect(() => {
    dispatch(fetchPostById({ id })).then(() => {
      setLoading(false);
    });
  }, []);

  //   const { currentPost } = useSelector((state) => state.postsData.posts);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
    </div>
  );
};

export default Details;
