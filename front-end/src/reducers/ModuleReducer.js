import {
    FETCH_MODULE_ERROR,
    FETCH_MODULE_SUCCES,
    FETCH_MODULE_PENDING,
    FETCH_MODULES_SUCCES, FETCH_MODULES_PENDING, FETCH_MODULES_ERROR
} from "../constants/ModuleConstants";

const initialState = {
    module: [],
    isPending: true
};

export const requestModule = (state=initialState, action={}) =>{
    switch (action.type) {
        case FETCH_MODULE_PENDING:
            return Object.assign({}, state, {isPending: true});
        case FETCH_MODULE_SUCCES:
            return Object.assign({}, state, {module: action.payload, isPending:false});
        case FETCH_MODULE_ERROR:
            return Object.assign({}, state, {error: action.payload});
        default:
            return state;
    }
};

const initialStateModules = {
    modules: [],
    isPending: true
};

export const requestAllModules = (state=initialStateModules, action={}) =>{
    switch (action.type) {
        case FETCH_MODULES_PENDING:
            return Object.assign({}, state, {isPending: true});
        case FETCH_MODULES_SUCCES:
            return Object.assign({}, state, {modules: action.payload, isPending:false});
        case FETCH_MODULES_ERROR:
            return Object.assign({}, state, {error: action.payload});
        default:
            return state;
    }
};