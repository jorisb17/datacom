import {FETCH_MODULE_ERROR, FETCH_MODULE_PENDING, FETCH_MODULE_SUCCES} from "../constants/ModuleConstants";
import {apiCall} from "../api";

export const requestModule = (id) => (dispatch) =>{
    dispatch({type: FETCH_MODULE_PENDING});
    apiCall(`http://localhost:3000/module/${id}`)
        .then(data => dispatch({type: FETCH_MODULE_SUCCES, payload: data}))
        .catch(error => dispatch({type: FETCH_MODULE_ERROR, payload: error}))
};