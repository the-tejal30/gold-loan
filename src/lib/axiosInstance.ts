import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_API,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"   // override default
    },
    timeout: 10000,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export default axiosInstance;
