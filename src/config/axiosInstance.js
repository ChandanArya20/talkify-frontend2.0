import axios from "axios";
import { BASE_API_URL } from "./api";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: BASE_API_URL,
});

// Interceptor to add the Authorization header to each request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwtToken"); // Adjust according to how you store your token
        if (token) {
            config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
