import {
    FETCH_MODULE_ERROR,
    FETCH_MODULE_PENDING,
    FETCH_MODULE_SUCCES, FETCH_MODULES_ERROR,
    FETCH_MODULES_PENDING, FETCH_MODULES_SUCCES
} from "../constants/ModuleConstants";
import {apiCall} from "../api";

export const requestModule = (id) => (dispatch) =>{
    dispatch({type: FETCH_MODULE_PENDING});
    apiCall(`http://localhost:3000/module/${id}`)
        .then(data => dispatch({type: FETCH_MODULE_SUCCES, payload: data}))
        .catch(error => dispatch({type: FETCH_MODULE_ERROR, payload: error}))
};

export const requestAllModules = (dispatch) =>{
    dispatch({type: FETCH_MODULES_PENDING});
    apiCall('http://localhost:3000/modules')
        .then(data => dispatch({type: FETCH_MODULES_SUCCES, payload: data}))
        .catch(err => dispatch({type:FETCH_MODULES_ERROR, payload: err}))
}