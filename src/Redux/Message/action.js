import axios from "axios";
import { ADD_NEW_MESSAGE, CREATE_NEW_MESSAGE, GET_ALL_MESSAGES } from "./actionType";
import { BASE_API_URL } from "../../config/api";
import { useSelector } from "react-redux";


export const createNewMessage = (messages, messageData) => async(dispatch) => {
    console.log("createNewMessage");
    console.log(messages);
    console.log(messageData);

    try {
        const response = await axios.post(`${BASE_API_URL}/api/message/send`,messageData,{ withCredentials: true });
        const resData = response.data;
    
        console.log(resData);
        dispatch({ type: CREATE_NEW_MESSAGE, payload: {messages, sentMessage:resData} });
    } catch (error) {
        console.log(error);
    }
        
};

export const getAllMessages = (chatId) => async(dispatch) => {
   
    try {
        const response = await axios.get(`${BASE_API_URL}/api/message/chat/${chatId}`,{ withCredentials: true });
        const resData = response.data;
        
        console.log(resData);
        dispatch({ type: GET_ALL_MESSAGES, payload: resData });
    } catch (error) {
        console.log(error);
    }
};

export const addNewMessage = (messages, newMessage) =>  {
    console.log(messages);
    console.log(newMessage);
    return { type: ADD_NEW_MESSAGE, payload: {messages,newMessage} };
};


