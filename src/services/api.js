import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:3000/api",

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

// Attach access token to protected requests
api.interceptors.request.use(
  (config) => {
    const accessToken =
      sessionStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;