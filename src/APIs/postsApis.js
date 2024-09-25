import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const addPost = createAsyncThunk("posts/addPost", async (post) => {
  const response = await axios.post(BASE_URL, post);
  return response.data;
});

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, updatedData }) => {
    const response = await axios.patch(`${BASE_URL}/${id}`, updatedData);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ id }) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  }
);

export const fetchPostAndCommentsById = createAsyncThunk(
  "posts/fetchPostAndCommentsById",
  async ({ id }) => {
    const postResponse = await axios.get(`${BASE_URL}/${id}`);
    const commentsResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=1/${id}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // const data = await response.json();
    // console.log("API Response:", data);
    // return data;

    return postResponse.data, commentsResponse.data;
  }
);
