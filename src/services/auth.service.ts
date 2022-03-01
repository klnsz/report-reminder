import ApiService from "./api.service";
import axios, {AxiosError, AxiosResponse} from "axios";

export interface ILogin {
    email: string,
    password: string
}

export const AuthService = {
    login (data: ILogin) {
        return ApiService.post('auth/login',
            data
        ).then((res: AxiosResponse) => {
            return res.data
        }).catch((err: AxiosError | Error) => {
            let message = 'Something happened. Please try again.'
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 401) {
                    message = 'Username or password is wrong. Please check the inputs and try again.'
                }
                console.log(err.response?.status, err.response?.data)
            }
            throw new Error(message)
        })
    },
    isLoggedIn: () => {
        return ApiService.get('auth').then(res => {
            console.log('Logged In', res.data);
            return Promise.resolve(res.data)
        }).catch(err => {
            console.log('Needs to be logged in');
            return Promise.reject()
        })
    },
    logout () {
        return ApiService.get('auth/logout')
    }
}