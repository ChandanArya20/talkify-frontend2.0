import { ADD_NEW_MESSAGE, CREATE_NEW_MESSAGE, DELETE_SELECTED_MESSAGES, SET_ALL_MESSAGES } from "./actionType";

const initialState = {
    messages:[],
    sentMessage:null,
    newMessage:null
};

export const messageReducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case CREATE_NEW_MESSAGE:
            return { ...state, messages: [...payload.messages, payload.sentMessage], sentMessage: payload.sentMessage };

        case SET_ALL_MESSAGES:
            return { ...state, messages: [...payload] };

        case ADD_NEW_MESSAGE:
            return { ...state, messages: [...payload.messages, payload.newMessage], newMessage: payload.newMessage };

        case DELETE_SELECTED_MESSAGES:
            console.log(payload);
            return { ...state, messages: [...payload] };

        default:
            return state;
    }
};
