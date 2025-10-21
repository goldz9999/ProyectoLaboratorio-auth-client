import axios from "axios";

const api = axios.create({
  baseURL: "https://reflexoperu-v3.marketingmedico.vip/backend/public/api/",
});

export const loginUser = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await api.post("/register", data);
  return response.data;
};

export default api;
