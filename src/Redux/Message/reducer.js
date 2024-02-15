import { ADD_NEW_MESSAGE, CREATE_NEW_MESSAGE, GET_ALL_MESSAGES } from "./actionType";

const initialState = {
    messages:[],
    sentMessage:null,
    newMessage:null
};

export const messageReducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case CREATE_NEW_MESSAGE:
            console.log(payload);
            const  m=[...payload.messages, payload.sentMessage];
            console.log(m);
            return { messages: [...m], sentMessage: payload.sentMessage };

        case GET_ALL_MESSAGES:
            return { ...state, messages: payload };

        case ADD_NEW_MESSAGE:
            console.log(payload);
            return { messages: [...payload.messages, payload.newMessage], newMessage: payload.newMessage };

        default:
            return state;
    }
};
