import {AuthService, ILogin} from "../services/auth.service";
import {LOGIN_FAIL, LOGIN_SUCCESS} from "./types";

export const login = (data: ILogin): (dispatch: any) => Promise<void> => (dispatch: any): Promise<void> => {
    return AuthService.login(data).then(res => {
        console.log(res);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.user
        })
        return Promise.resolve()
    }).catch(err => {
        console.log(err);
        dispatch({
            type: LOGIN_FAIL
        })
        return Promise.reject(err.message)
    })
}