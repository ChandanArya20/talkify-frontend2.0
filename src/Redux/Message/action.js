import axios from "axios";
import { ADD_NEW_MESSAGE, CREATE_NEW_MESSAGE, DELETE_SELECTED_MESSAGES, SET_ALL_MESSAGES, SET_NEW_MESSAGES } from "./actionType";
import { BASE_API_URL } from "../../config/api";

export const createNewMessage = (messageData) => async(dispatch) => {

    try {
        const response = await axios.post(`${BASE_API_URL}/api/message/send`, messageData, 
        { withCredentials: true });
        const resData = response.data;
        console.log(resData);
        
        // dispatch({ type: CREATE_NEW_MESSAGE, payload: resData });
    } catch (error) {
        console.log(error);
    }
        
};

export const setAllMessages = (messages) => {
   
    return({type:SET_ALL_MESSAGES, payload:messages})
};

export const addNewMessage = (messages, newMessage) =>  {
   
    return { type: ADD_NEW_MESSAGE, payload: {messages,newMessage} };
};

export const fetchNewMessagesFromServer = (chatId, page, size) => async(dispatch) => {
   
    try {
        const response = await axios.get(`${BASE_API_URL}/api/message/${chatId}?page=${page}&size=${size}`, 
        { withCredentials: true });
        const resData = response.data;
        console.log(resData);
        
        dispatch({ type: SET_NEW_MESSAGES, payload: resData });
    } catch (error) {
        console.log(error);
    }
};

export const deleteSelectedMessages=(messages, selectedMessages)=>async(dispatch)=>{

    messages = messages.filter(msg=>!selectedMessages.includes(msg));
    dispatch({type:DELETE_SELECTED_MESSAGES, payload:messages})
}


