import { LOGIN, LOGOUT, REQ_USER, REGISTER, SEARCH_USER, UPDATE_USER, UPDATE_JWT_TOKEN} from "./actionType";

const user=JSON.parse(localStorage.getItem("user"));
const jwtToken=localStorage.getItem("jwtToken");
const isLoggedin=localStorage.getItem("isLoggedin") === "true";

const initialState = {
    currentUser: user || {},
    jwtToken:jwtToken || null,
    isAuthenticated: isLoggedin || false,
    searchedUsers:[]
};

export const userReducer = (state = initialState, { type, payload }) => {
    
    switch (type) {

        case REGISTER:
            return { ...state, currentUser:payload.user, jwtToken:payload.jwtToken, isAuthenticated: true };
        
        case REQ_USER:
            return {...state,currentUser:payload};

        case SEARCH_USER:
            return {...state,searchedUsers:payload};

        case SEARCH_USER:
            return {...state,searchedUserid:payload};

        case LOGIN:
            return { ...state, currentUser:payload.user, jwtToken:payload.jwtToken, isAuthenticated: true };

        case LOGOUT:
            return { currentUser:{}, jwtToken:null, isAuthenticated: false, searchedUsers:[] };

        case UPDATE_JWT_TOKEN:
            return { ...state, jwtToken:payload };

        case UPDATE_USER:
            return { ...state, currentUser:payload };

        default:
            return state;
    }
};
