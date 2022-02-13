import axios, { AxiosRequestConfig } from "axios"


const ApiService = {
    setHeader() {
        axios.defaults.headers.common[
            "Authorization"
        ] = `Token `;
    },
    
    get(endpoint: string, params: object = {}, opt: AxiosRequestConfig = {}) {
        return axios.get(endpoint, {
            params,
            ...opt
        })
    },
    
     post (endpoint: string, data: object = {}, opt: AxiosRequestConfig = {}) {
        return axios.post(endpoint, data, opt)
    }
}

export default ApiService

