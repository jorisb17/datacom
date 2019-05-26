import {changeRoute} from "./NavReducer";
import {signIn} from "./AuthReducer";
import {requestModule, requestAllModules} from "./ModuleReducer";
import {combineReducers} from "redux";

export default combineReducers({
    changeRoute,
    requestModule,
    requestAllModules,
    auth: signIn
});