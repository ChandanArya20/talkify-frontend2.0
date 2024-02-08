import axios from "axios";
import { BASE_API_URL } from "../../config/api";
import { CREATE_CHAT, CREATE_GROUP, GET_USERS_CHAT } from "./actionType";

export const createChat = (participantId) => async(dispatch) => {
    try {
        const response = await axios.post(
            `${BASE_API_URL}/chat/single?participantId=${participantId}`, {}, {  withCredentials: true}); 

        const resData = response.data;
        console.log(resData);
        dispatch({ type: CREATE_CHAT, payload: resData });

    } catch (error) {
        // Handle error here
        console.error(error);
    }
};


export const createGroupChat = (chatData) => async(dispatch) => {
   
    try {
        const response = await axios.post(`${BASE_API_URL}/chat/create-group`,chatData,{ withCredentials: true });
        const resData = response.data;
    
        console.log(resData);
        dispatch({ type: CREATE_GROUP, payload: resData });
    } catch (error) {
        console.log(error);
    }
    
};

export const getUsersChat = () => async(dispatch) => {
   
    const response = await axios.get(`${BASE_API_URL}/chat/all-chat`,{ withCredentials: true });
    const resData = response.data;
    
    console.log(resData);
    dispatch({ type: GET_USERS_CHAT, payload: resData }); 
};



