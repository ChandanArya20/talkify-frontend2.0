import { ADD_NEW_MESSAGE, CREATE_NEW_MESSAGE, SET_ALL_MESSAGES } from "./actionType";

const initialState = {
    messages:[],
    sentMessage:null,
    newMessage:null
};

export const messageReducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case CREATE_NEW_MESSAGE:
            return { messages: [...payload.messages, payload.sentMessage], sentMessage: payload.sentMessage };

        case SET_ALL_MESSAGES:
            return { ...state, messages: payload };

        case ADD_NEW_MESSAGE:
            return { messages: [...payload.messages, payload.newMessage], newMessage: payload.newMessage };

        default:
            return state;
    }
};
