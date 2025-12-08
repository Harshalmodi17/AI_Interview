// src/api/authService.js
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000"; // Django backend

export const registerUser = (username, email, password) => {
  return axios.post(`${API_BASE}/register/`, {
    username,
    email,
    password,
  });
};

export const loginUser = (username, password) => {
  return axios.post(`${API_BASE}/login/`, {
    username,
    password,
  });
};

export const getCurrentUser = () => {
  const access = localStorage.getItem("access");
  if (!access) return Promise.reject("No access token");

  return axios.get(`${API_BASE}/me/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
};

export const logoutUser = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};
