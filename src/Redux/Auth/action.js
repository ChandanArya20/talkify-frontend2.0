import axios from "axios"
import { BASE_API_URL } from "../../config/api"
import {
    LOGIN,
    LOGOUT,
    REGISTER,
    REQ_USER,
    SEARCH_USER,
    SEARCH_USERID,
    UPDATE_USER,
} from "./actionType"
import { getAuthToken } from "../../Utils/tokenUtils"

// Action to register a new user
export const register = (userData) => async (dispatch) => {
    const response = await axios.post(`${BASE_API_URL}/api/user/register`,userData)
    const resData = response.data

    // Store user data in local storage and update state
    localStorage.setItem("user", JSON.stringify(resData.userResponse))
    localStorage.setItem("authToken", resData.authToken)
    localStorage.setItem("isLoggedin", "true")
    console.log("User registered ", resData)

    dispatch({ type: REGISTER, payload: {user:resData.userResponse, authToken:resData.authToken} })
}

// Action to log in a user
export const login = (userData) => async (dispatch) => {
    const response = await axios.post(`${BASE_API_URL}/api/user/login`, userData)
    const resData = response.data

    // Store user data in local storage and update state
    localStorage.setItem("user", JSON.stringify(resData.userResponse))
    localStorage.setItem("authToken", resData.authToken)
    localStorage.setItem("isLoggedin", "true")
    console.log("User logged in ", resData)

    dispatch({ type: LOGIN, payload: {user:resData.userResponse, authToken:resData.authToken}})
}

// Action to log out a user
export const logout = () => async (dispatch) => {
    try {
        // Send logout request to the server
        const response = await axios.get(`${BASE_API_URL}/api/user/logout`, {
            headers:{
                Authorization:getAuthToken()
            }
        })
        console.log("User logged out : ", response.data)
    } catch (error) {
        console.log(error)
    } finally {
        // Clear local storage and update state
        localStorage.removeItem("user")
        localStorage.removeItem("authToken")
        localStorage.removeItem("isLoggedin")

        dispatch({ type: LOGOUT, payload: null })
    }
}

// Action to fetch current user data
export const currentUser = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_API_URL}/api/user/profile`, {
            headers:{
                Authorization:getAuthToken()
            }
        })
        const resData = response.data
        console.log("User ", resData)

        dispatch({ type: REQ_USER, payload: resData })
    } catch (error) {
        console.log(error)
    }
}

// Action to search for users
export const SearchUser = (query) => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_API_URL}/api/user/search-users?query=${query}`,{ 
            headers:{
                Authorization:getAuthToken()
            },
        })
        const resData = response.data
        console.log("search user ", resData)

        dispatch({ type: SEARCH_USER, payload: resData })
    } catch (error) {
        console.log(error)
    }
}

// Action to search for user by ID
// export const searchUserId = (query) => async (dispatch) => {
//     try {
//         const response = await axios.get(`${BASE_API_URL}/api/user/search-users?query=${query}`,
//         { 
//             headers:{
//                 Authorization:getAuthToken()
//             },
//         });
//         const resData = response.data;
//         console.log("Search user ", resData);

//         dispatch({ type: SEARCH_USERID, payload: resData });
//     } catch (error) {
//         console.log(error);
//     }
// };

// Action to update user data
export const updateUser = (userData) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/api/user/update`, userData,{ 
            headers:{
                Authorization:getAuthToken()
            }
        })
        const resData = response.data
        console.log("Updated user ", resData)

        localStorage.setItem("user", JSON.stringify(resData))
        dispatch({ type: UPDATE_USER, payload: resData })
    } catch (error) {
        console.log(error)
    }
}

// Action to log in a user after password update
export const loginAfterPasswordUpdate = (resData) => async (dispatch) => {
    // Update local storage and state with new user data

    localStorage.setItem("user", JSON.stringify(resData.userResponse))
    localStorage.setItem("authToken", resData.authToken)
    localStorage.setItem("isLoggedin", "true")
    console.log("User logged in ", resData)

    dispatch({ type: LOGIN, payload: {user:resData.userResponse, authToken:resData.authToken} })
}
