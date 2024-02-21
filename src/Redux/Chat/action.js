import axios from "axios";
import { BASE_API_URL } from "../../config/api";
import { CREATE_CHAT, CREATE_GROUP, DELETE_ALL_MESSAGES, DELETE_CHAT, DELETE_SELECTED_MESSAGES_IN_CHAT, GET_USERS_CHAT, UPDATE_MESSAGES_IN_CHAT } from "./actionType";


export const createChat = (participantId) => async(dispatch) => {
    console.log();
    try {
        const response = await axios.post(
            `${BASE_API_URL}/api/chat/single?participantId=${participantId}`, {}, {  withCredentials: true}); 

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
        const response = await axios.post(`${BASE_API_URL}/api/chat/create-group`,chatData,{ withCredentials: true });
        const resData = response.data;
    
        console.log("group created ", resData);
        dispatch({ type: CREATE_GROUP, payload: resData });
    } catch (error) {
        console.log(error);
    }
    
};

export const getUsersChat = () => async(dispatch) => {
   
    const response = await axios.get(`${BASE_API_URL}/api/chat/all-chat`,{ withCredentials: true });
    const resData = response.data;
    
    console.log(resData);
    dispatch({ type: GET_USERS_CHAT, payload: resData }); 
};

export const updateMessageInChat = (chats, chatId, newMessage)=> {
   
    const filteredChat = chats.filter(chat=>chat.id===chatId)[0];
    const newChats = chats.filter(chat=>chat.id!==chatId);

    filteredChat.messages=[...filteredChat.messages, newMessage];
    chats=[...newChats, filteredChat];
 

    return {type:UPDATE_MESSAGES_IN_CHAT, payload:chats}

};

export const deleteChat = (chats, chatId)=> async(dispatch)=>{

    try {
        const response = await axios.delete(`${BASE_API_URL}/api/chat/${chatId}/delete`, { withCredentials: true } );
        console.log(response.data);

        const filteredChats = chats.filter(chat=>chat.id!==chatId);

        dispatch({type:DELETE_CHAT, payload:filteredChats});

    } catch (error) {
        console.log(error);
    }
};

export const deleteALLMessagesByChatId = (chats, chatId)=> async(dispatch)=>{

    try {
        const response = await axios.delete(`${BASE_API_URL}/api/message/delete-all/chat/${chatId}`, { withCredentials: true } );
        console.log(response.data);

        const filteredChat = chats.filter(chat=>chat.id===chatId)[0];
        const newChats = chats.filter(chat=>chat.id!==chatId);
        filteredChat.messages=[];

        chats=[...newChats, filteredChat]

        dispatch({type:DELETE_ALL_MESSAGES, payload:chats});

    } catch (error) {
        console.log(error);
    }
};

export const deleteSelecetdMessagesByChatId = (chats, selectedMessages, chatId)=> async(dispatch)=>{
    console.log(chats);
    console.log(selectedMessages);
    const messageIds = selectedMessages.map(message=>message.id);
    console.log(messageIds);
    try {
        const response = await axios.delete(`${BASE_API_URL}/api/message/delete/chat/${chatId}`, { data: messageIds, withCredentials: true } );
        console.log(response.data);

        const filteredChat = chats.filter(chat=>chat.id===chatId)[0];
        const remainingChats = chats.filter(chat=>chat.id!==chatId);

        const messages = filteredChat.messages.filter(msg=>!selectedMessages.includes(msg));
        filteredChat.messages=[...messages];

        chats=[...remainingChats, filteredChat]

        dispatch({type:DELETE_SELECTED_MESSAGES_IN_CHAT, payload:chats});

    } catch (error) {
        console.log(error);
    }
};



