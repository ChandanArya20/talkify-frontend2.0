import { ADD_NEW_MESSAGE, CREATE_NEW_MESSAGE, SET_ALL_MESSAGES } from "./actionType";

// export const createNewMessage = (messages, messageData) => async(dispatch) => {

//     try {
//         const response = await axios.post(`${BASE_API_URL}/api/message/send`,messageData,{ withCredentials: true });
//         const resData = response.data;
    
//         console.log(resData);
//         dispatch({ type: CREATE_NEW_MESSAGE, payload: {messages, sentMessage:resData} });
//     } catch (error) {
//         console.log(error);
//     }
        
// };

export const setAllMessages = (messages) => {
   
    console.log(messages);
    return({type:SET_ALL_MESSAGES, payload:messages})
    
};

export const addNewMessage = (messages, newMessage) =>  {
    console.log(messages);
    console.log(newMessage);
    return { type: ADD_NEW_MESSAGE, payload: {messages,newMessage} };
};


