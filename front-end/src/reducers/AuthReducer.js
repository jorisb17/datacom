import {SET_AUTH_USER} from "../constants/AuthConstants";

const initialSate = {
    id: null,
    email: '',
    name: '',
    auth: false,
};

export const signIn = (state=initialSate, action) =>{
    switch(action.type){
        case SET_AUTH_USER:
            const {id, email, name} = action.payload;
            return Object.assign({}, state, {
                id: id,
                email: email,
                name: name,
                auth: true
            });
        default:
            return state;
    }

}