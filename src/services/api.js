import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor: attach token with protected API calls
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    const publicUrls = ["/api/auth/login", "/api/auth/register"];

    if (token && !publicUrls.includes(config.url)) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: auto logout when token is invalid/expired
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const publicUrls = ["/api/auth/login", "/api/auth/register"];
    const requestUrl = error.config?.url;

    if (
      error.response?.status === 401 &&
      !publicUrls.includes(requestUrl)
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;