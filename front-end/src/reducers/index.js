import {changeRoute} from "./NavReducer";
import {signIn} from "./AuthReducer";
import {combineReducers} from "redux";

export default combineReducers({
    changeRoute,
    auth: signIn
});