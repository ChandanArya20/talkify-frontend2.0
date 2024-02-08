import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { thunk } from "redux-thunk";
import { userReducer } from "./Auth/reducer";
import { chatReducer } from "./Chat/reducer";
import { messageReducer } from "./Message/reducer";

const reducers=combineReducers(
    {
        userStore:userReducer,
        chatStore:chatReducer, 
        messageStore:messageReducer
    });

export const store=createStore(reducers, applyMiddleware(thunk) );