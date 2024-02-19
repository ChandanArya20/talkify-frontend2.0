import { LOGIN, LOGOUT, REQ_USER, REGISTER, SEARCH_USER, UPDATE_USER} from "./actionType";

const user=JSON.parse(localStorage.getItem("user"));
const isLoggedin=localStorage.getItem("isLoggedin") === "true";

const initialState = {
    currentUser: user || null,
    isAuthenticated: isLoggedin || false,
    searchedUsers:[]
};

export const userReducer = (state = initialState, { type, payload }) => {
    
    switch (type) {

        case REGISTER:
            return { ...state, currentUser: payload, isAuthenticated: true };
        
        case REQ_USER:
            return {...state,currentUser:payload};

        case SEARCH_USER:
            return {...state,searchedUsers:payload};

        case LOGIN:
            return { ...state, currentUser:payload, isAuthenticated: true };

        case LOGOUT:
            return { ...state, currentUser:{}, isAuthenticated: false };

        case UPDATE_USER:
            return { ...state, currentUser:payload };

        default:
            return state;
    }
};
