// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://projeto-get-stock.onrender.com", // ajuste conforme seu backend
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
