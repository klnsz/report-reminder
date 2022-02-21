import {AuthService} from "../services/auth.service";
import {IAction, IInitState} from "./types";
import {LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT} from "../actions/types";

let initialState: IInitState = {
    isLoggedIn: false,
    user: null
}

AuthService.isLoggedIn().then(res => {
    initialState = res
}).catch(() => {})

export default function (state: IInitState = initialState, action: IAction) {
    const { type, payload } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload
            }
        case LOGIN_FAIL:
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            }
        default:
            return state;
    }
}