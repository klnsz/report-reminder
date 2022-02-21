export interface IAction {
    type: string,
    payload?: object|string
}

export interface IInitState {
    isLoggedIn: boolean,
    user: null|object
}