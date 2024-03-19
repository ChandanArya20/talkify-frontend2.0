import axios from "axios";
import { BASE_API_URL } from "../../config/api";
import { LOGIN, LOGOUT, REGISTER, REQ_USER, SEARCH_USER, SEARCH_USERID, UPDATE_USER } from "./actionType";

// Action to register a new user
export const register = (userData) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/api/user/register`, userData, 
        { withCredentials: true });
        const resData = response.data;
        
        // Store user data in local storage and update state
        localStorage.setItem("user", JSON.stringify(resData));
        localStorage.setItem("isLoggedin", 'true');
        console.log("User registered ", resData);

        dispatch({ type: REGISTER, payload: resData });
    } catch (error) {
        console.log(error);
    }
};

// Action to log in a user
export const login = (userData) => async(dispatch) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/api/user/login`, userData, 
        { withCredentials: true });
        const resData = response.data;
        
        // Store user data in local storage and update state
        localStorage.setItem("user", JSON.stringify(resData));
        localStorage.setItem("isLoggedin", 'true');
        console.log("User logged in ", resData);

        dispatch({ type: LOGIN, payload: resData });
    } catch (error) {
        console.log(error);
    }
};

// Action to log out a user
export const logout = () => async (dispatch) => {
    try {
        // Send logout request to the server
        const response = await axios.get(`${BASE_API_URL}/api/user/logout`, { withCredentials: true });
        const resData = response.data;
        console.log("User logged out : ", resData);
    } catch (error) {
        console.log(error);
    } finally {
        // Clear local storage and update state
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedin");

        dispatch({ type: LOGOUT, payload: null });
    }
};

// Action to fetch current user data
export const currentUser = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_API_URL}/api/user/profile`, { withCredentials: true });
        const resData = response.data;
        console.log("User ", resData);

        dispatch({ type: REQ_USER, payload: resData });
    } catch (error) {
        console.log(error);
    }
};

// Action to search for users
export const SearchUser = (query) => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_API_URL}/api/user/search-users?query=${query}`,
        { withCredentials: true });
        const resData = response.data;
        console.log("search user ", resData);
        
        dispatch({ type: SEARCH_USER, payload: resData });
    } catch (error) {
        console.log(error);
    }
};

// Action to search for user by ID
// export const searchUserId = (query) => async (dispatch) => {
//     try {
//         const response = await axios.get(`${BASE_API_URL}/api/user/search-users?query=${query}`, 
//         { withCredentials: true });
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
        const response = await axios.post(`${BASE_API_URL}/api/user/update`, userData, 
        { withCredentials: true });
        const resData = response.data;
        console.log("Updated user ", resData);

        localStorage.setItem("user", JSON.stringify(resData));
        dispatch({ type: UPDATE_USER, payload: resData });
    } catch (error) {
        console.log(error);
    }
};

// Action to log in a user after password update
export const loginAfterPasswordUpdate = (userData) => async(dispatch) => {
    // Update local storage and state with new user data
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isLoggedin", 'true');
    console.log("User logged in ", userData);
    
    dispatch({ type: LOGIN, payload: userData });
};
