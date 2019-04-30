import {SET_AUTH_USER} from "../constants/AuthConstants";

export const signIn = (user) =>({
    type: SET_AUTH_USER,
    payload: user
});