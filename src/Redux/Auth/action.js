import axios from "axios"
import { BASE_API_URL } from "../../config/api"
import {
    LOGIN,
    LOGOUT,
    REGISTER,
    REQ_USER,
    SEARCH_USER,
    SEARCH_USERID,
    UPDATE_JWT_TOKEN,
    UPDATE_USER,
} from "./actionType"
import axiosInstance from "../../config/axiosInstance";

// Action to register a new user
export const register = (userData) => async (dispatch) => {
    const response = await axiosInstance.post(`${BASE_API_URL}/api/users/signup`, userData)
    const resData = response.data

    // Store user data in local storage and update state
    localStorage.setItem("user", JSON.stringify(resData.user))
    localStorage.setItem("jwtToken", JSON.stringify(resData.jwtToken))
    localStorage.setItem("isLoggedin", "true")
    console.log("User logged in ", resData)

    dispatch({ type: REGISTER, payload: resData })
}

// Action to log in a user
export const login = (userData) => async (dispatch) => {
    const response = await axiosInstance.post(`${BASE_API_URL}/api/users/login`, userData)
    const resData = response.data

    // Store user data in local storage and update state
    localStorage.setItem("user", JSON.stringify(resData.user))
    localStorage.setItem("jwtToken", JSON.stringify(resData.jwtToken))
    localStorage.setItem("isLoggedin", "true")
    console.log("User logged in ", resData)

    dispatch({ type: LOGIN, payload: resData })
}

// Action to log out a user
export const logout = () => {
    // Clear local storage and update state
    localStorage.removeItem("user")
    localStorage.removeItem("jwtToken")
    localStorage.removeItem("isLoggedin")

    return { type: LOGOUT, payload: null }
}

// Action to fetch current user data
export const currentUser = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`${BASE_API_URL}/api/users/profile`)
        const resData = response.data

        console.log("User ", resData)
        dispatch({ type: REQ_USER, payload: resData })
    } catch (error) {
        console.log(error)
    }
}

export const updateJwtToken = (jwtToken) => {
    return { type: UPDATE_JWT_TOKEN, payload: jwtToken }
}

// Action to search for users
export const SearchUser = (query) => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`${BASE_API_URL}/api/users/search?query=${query}`)
        const resData = response.data

        console.log("search user ", resData)
        dispatch({ type: SEARCH_USER, payload: resData })
    } catch (error) {
        console.log(error)
    }
}

// Action to update user data
export const updateUser = (userData) => async (dispatch) => {
    try {
        const response = await axiosInstance.put(`${BASE_API_URL}/api/users/update`, userData)
        const resData = response.data

        console.log("Updated user ", resData)
        localStorage.setItem("user", JSON.stringify(resData))

        dispatch({ type: UPDATE_USER, payload: resData })
    } catch (error) {
        console.log(error)
    }
}

// Action to log in a user after password update
export const loginAfterPasswordUpdate = (userData) => async (dispatch) => {
    // Update local storage and state with new user data
    localStorage.setItem("user", JSON.stringify(userData.user))
    localStorage.setItem("jwtToken", JSON.stringify(userData.jwtToken))
    localStorage.setItem("isLoggedin", "true")
    console.log("User logged in ", userData)

    dispatch({ type: LOGIN, payload: userData })
}
