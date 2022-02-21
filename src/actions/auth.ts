import {AuthService, ILogin} from "../services/auth.service";
import {LOGIN_FAIL, LOGIN_SUCCESS, SET_MESSAGE} from "./types";

export const login = (data: ILogin): (dispatch: any) => Promise<void> => (dispatch: any): Promise<void> => {
    return AuthService.login(data).then(res => {
        console.log(res);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch({
            type: SET_MESSAGE,
            message: 'Successfully logged in.'
        })
        return Promise.resolve()
    }).catch(err => {
        console.log(err);
        dispatch({
            type: LOGIN_FAIL
        })
        dispatch({
            type: SET_MESSAGE,
            payload: err.message
        })
        return Promise.reject(err.message)
    })
}