import axios, { AxiosRequestConfig } from "axios"

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://backend.kalinsaz.dev'

const ApiService = {
    setHeader() {
        axios.defaults.headers.common[
            "Authorization"
        ] = `Token `;
    },
    
    get(endpoint: string, params: object = {}, opt: AxiosRequestConfig = {}) {
        return axios.get(endpoint, {
            params,
            withCredentials: true,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            ...opt
        })
    },
    
     post (endpoint: string, data: object = {}, opt: AxiosRequestConfig = {}) {
        return axios.post(endpoint, data, {
            withCredentials: true,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            ...opt
        })
    }
}

export default ApiService

