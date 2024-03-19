import axios from "axios";
import { BASE_API_URL } from "../../config/api";
import { CREATE_CHAT, CREATE_GROUP, DELETE_ALL_MESSAGES, DELETE_CHAT, DELETE_SELECTED_MESSAGES_IN_CHAT, GET_USERS_CHAT, UPDATE_MESSAGES_IN_CHAT } from "./actionType";

// Action to create a single chat
export const createChat = (participantId) => async(dispatch) => {
    try {
        // Send a request to the server to create a single chat with the specified participant
        const response = await axios.post(`${BASE_API_URL}/api/chat/single?participantId=${participantId}`, 
        {}, { withCredentials: true }); 
        const resData = response.data;
        console.log(resData);
        
        dispatch({ type: CREATE_CHAT, payload: resData });
    } catch (error) {
        console.error(error);
    }
};

// Action to create a group chat
export const createGroupChat = (chatData) => async(dispatch) => {
    try {
        // Send a request to the server to create a group chat with the specified data
        const response = await axios.post(`${BASE_API_URL}/api/chat/create-group`, chatData, 
        { withCredentials: true });
        const resData = response.data;
        console.log("group created ", resData);
        
        dispatch({ type: CREATE_GROUP, payload: resData });
    } catch (error) {
        console.log(error);
    }  
};

// Action to fetch all user chats
export const getUsersChat = () => async(dispatch) => {
   
    const response = await axios.get(`${BASE_API_URL}/api/chat/all-chat`, { withCredentials: true });
    const resData = response.data;
    console.log(resData);
    
    dispatch({ type: GET_USERS_CHAT, payload: resData }); 
};

// Action to update messages in a chat
export const updateMessageInChat = (chats, chatId, newMessage)=> {

    // Find the chat by its ID and update its messages with the new message
    const Chat = chats.filter(chat=>chat.id===chatId)[0];
    const remainingChats = chats.filter(chat=>chat.id!==chatId);

    // Add new message to chat 
    Chat.messages=[...Chat.messages, newMessage];
    chats=[...remainingChats, Chat];
    
    return { type: UPDATE_MESSAGES_IN_CHAT, payload: chats }
};

// Action to delete a chat
export const deleteChat = (chats, chatId)=> async(dispatch)=>{
    try {
        const response = await axios.delete(`${BASE_API_URL}/api/chat/${chatId}/delete`, 
        { withCredentials: true } );
        console.log(response.data);

        // Filter out the deleted chat from the list of chats
        const remainingChats = chats.filter(chat=>chat.id!==chatId);
        // Dispatch the action with the updated chat data
        dispatch({ type: DELETE_CHAT, payload: remainingChats });
    } catch (error) {
        console.log(error);
    }
};

// Action to delete all messages in a chat
export const deleteALLMessagesByChatId = (chats, chatId)=> async(dispatch)=>{
    try {
        const response = await axios.delete(`${BASE_API_URL}/api/message/delete-all/${chatId}`, 
        { withCredentials: true } );
        console.log(response.data);

        // Find the chat by its ID and clear its messages
        const chat = chats.filter(chat=>chat.id===chatId)[0];
        const remainingChats = chats.filter(chat=>chat.id!==chatId);
        chat.messages=[];
        chats=[...remainingChats, chat];
       
        dispatch({ type: DELETE_ALL_MESSAGES, payload: chats });
    } catch (error) {
        console.log(error);
    }
};

// Action to delete selected messages in a chat
export const deleteSelecetdMessagesByChatId = (chats, selectedMessages, chatId)=> async(dispatch)=>{
    const messageIds = selectedMessages.map(message=>message.id);
    try {
    
        const response = await axios.delete(`${BASE_API_URL}/api/message/delete/${chatId}`, 
        { data: messageIds, withCredentials: true } );
        console.log(response.data);

        // Find the chat by its ID and remove the selected messages
        const chat = chats.filter(chat=>chat.id===chatId)[0];
        const remainingChats = chats.filter(chat=>chat.id!==chatId);
        const messages = chat.messages.filter(msg=>!selectedMessages.includes(msg));
        chat.messages=[...messages];
        chats=[...remainingChats, chat];
       
        dispatch({ type: DELETE_SELECTED_MESSAGES_IN_CHAT, payload: chats });
    } catch (error) {
        console.log(error);
    }
};
