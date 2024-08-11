import axios from "axios"
import { BASE_API_URL } from "./api"
import { history } from "./history"
import { logout } from "../Redux/Auth/action"
import { store } from "../Redux/store"

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: BASE_API_URL,
})

// Interceptor to add the Authorization header to each request
axiosInstance.interceptors.request.use(
    (config) => {
        console.log("Request intercepted")
        const token = localStorage.getItem("jwtToken") // Adjust according to how you store your token
        if (token) {
            config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        console.log("Response intercepted")
        return response
    },
    (error) => {
        console.log("Response intercepted")
        const { response } = error
        if (response && response.data.errorCode === 1005) {
            store.dispatch(logout());
            history.push("/signin")
        }
        return Promise.reject(error)
    }
)


export default axiosInstance
