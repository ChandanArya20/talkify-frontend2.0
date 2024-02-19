import { CREATE_CHAT, CREATE_GROUP, DELETE_ALL_MESSAGES, DELETE_CHAT, GET_USERS_CHAT, UPDATE_MESSAGES_IN_CHAT } from "./actionType";

const initialState = {
    chats:[],
    createdChat:null,
    createdGroup:null
};

export const chatReducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case CREATE_CHAT:
            return { ...state, createdChat: payload };

        case CREATE_GROUP:
            return { ...state, createdGroup: payload };

        case GET_USERS_CHAT:
            return { ...state, chats: payload };

        case UPDATE_MESSAGES_IN_CHAT:
            return { ...state, chats: payload };

        case DELETE_CHAT:
            return { ...state, chats: payload };

        case DELETE_ALL_MESSAGES:
            return { ...state, chats: payload };

        default:
            return state;
    }
};
