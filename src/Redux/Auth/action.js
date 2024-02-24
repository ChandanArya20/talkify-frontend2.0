import axios from "axios";
import { BASE_API_URL } from "../../config/api";
import { LOGIN, LOGOUT, REGISTER, REQ_USER, SEARCH_USER, SEARCH_USERID, UPDATE_USER } from "./actionType";

export const register = (userData) => async (dispatch) => {

    console.log(userData);
   
    const response = await axios.post(`${BASE_API_URL}/api/user/register`,userData,{ withCredentials: true });
    
    const resData = response.data;
    localStorage.setItem("user", JSON.stringify(resData));
    localStorage.setItem("isLoggedin", 'true');
    console.log("User registered ", resData);
    dispatch({ type: REGISTER, payload: resData });
};

export const login = (userData) => async(dispatch) => {
    
    const response = await axios.post(`${BASE_API_URL}/api/user/login`,userData,{ withCredentials: true });
    
    const resData = response.data;
    localStorage.setItem("user", JSON.stringify(resData));
    localStorage.setItem("isLoggedin", 'true');
    console.log("User logged in ", resData);
  
    dispatch({ type: LOGIN, payload: resData });
};

export const logout = () => async (dispatch) => {
    try {
        const response = await axios.get(
            `${BASE_API_URL}/api/user/logout`,{ withCredentials: true }
        );
        const resData = response.data;
        console.log("User logged out : ", resData);
    
    } catch (error) {
        console.log(error);
    } finally{
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedin");
        dispatch({ type: LOGOUT, payload: null });
    }
};

export const currentUser = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_API_URL}/api/user/profile`, {
            withCredentials: true,
        });
        const resData = response.data;
        console.log("User ", resData);
        dispatch({ type: REQ_USER, payload: resData });
    } catch (error) {
        console.log(error);
    }
};

export const SearchUser = (query) => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_API_URL}/api/user/search-users?query=${query}`,
        { withCredentials: true }
        );
        const resData = response.data;
        console.log("search user ", resData);
        dispatch({ type: SEARCH_USER, payload: resData });
    } catch (error) {
        console.log(error);
    }
};

export const SearchUserid = (query) => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_API_URL}/api/user/search-users?query=${query}`,
        { withCredentials: true }
        );
        const resData = response.data;
        console.log("search user ", resData);
        dispatch({ type: SEARCH_USERID, payload: resData });
    } catch (error) {
        console.log(error);
    }
};

export const updateUser = (userData) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/api/user/update`, userData, 
        { withCredentials: true });

        const resData = response.data;
        console.log("updated user ", resData);
        localStorage.setItem("user", JSON.stringify(resData));
        dispatch({ type: UPDATE_USER, payload: resData });
    } catch (error) {
        console.log(error);
    }
};

export const loginAfterPasswordUpdate = (userData) => async(dispatch) => {
    
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isLoggedin", 'true');
    console.log("User logged in ", userData);
  
    dispatch({ type: LOGIN, payload: userData });
};