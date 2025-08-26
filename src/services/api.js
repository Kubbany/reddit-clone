import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, 
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

export const createPost = (data) => API.post("/posts", data);

export const getPosts = async () => {
  const res = await API.get("/posts");
  return res.data;
};

export const votePost = async (postId, value) => {
  const res = await API.post("/votes", { postId, value });
  return res.data;
};

export const createComment = (data) => API.post("/comments", data);

export const getCommentsByPostId = (postId) =>
  API.get(`/comments/post/${postId}`);