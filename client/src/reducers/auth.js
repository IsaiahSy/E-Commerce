import { SIGN_IN, LOGOUT } from "../constants";

const authReducer = (state = [], action) => {
    switch(action.type) {
        case SIGN_IN:
        {
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
            return { ...state, authData: action?.payload }
        }
        case LOGOUT:
        {
            localStorage.clear();
            return { ...state, authData: null }
        }
        default:
            return state;
    }
}

export default authReducer;