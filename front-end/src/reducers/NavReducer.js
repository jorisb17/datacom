import {CHANGE_ROUTE} from "../constants/NavConstants";

const initialState = {
    route: '',
};


export const changeRoute = (state=initialState, action={}) =>{
    switch(action.type){
        case CHANGE_ROUTE:
            document.title = action.payload;
            return Object.assign({}, state, {route: action.payload});
        default:
            return state
    }
};