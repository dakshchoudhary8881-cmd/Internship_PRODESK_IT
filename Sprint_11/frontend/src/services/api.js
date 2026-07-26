import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export const getPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};

export const createPost = async (formData) => {
  const response = await axios.post("http://localhost:5000/api/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
};

export const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

export default api;
