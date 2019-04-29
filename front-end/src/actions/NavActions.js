import {CHANGE_ROUTE} from "../constants/NavConstants";

export const setRoute = (route) =>({
    type: CHANGE_ROUTE,
    payload: route
});