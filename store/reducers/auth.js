import { AUTHENTICATION, LOGOUT, TRY_AUTOLOGIN } from "../actions/auth"

const initialState = {
    token: null,
    userId: null,
    tryAutoLogin: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATION:
            return{
                token : action.idToken,
                userId: action.userId,
                tryAutoLogin: true
            }

        case TRY_AUTOLOGIN:
            return{
                ...state,
                tryAutoLogin: true
            }

        case LOGOUT: 
            return{
                ...initialState,
                tryAutoLogin: true
            }

        default:
            return state;
    }
}