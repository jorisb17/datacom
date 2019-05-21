import {changeRoute} from "./NavReducer";
import {signIn} from "./AuthReducer";
import {requestModule} from "./ModuleReducer";
import {combineReducers} from "redux";

export default combineReducers({
    changeRoute,
    requestModule,
    auth: signIn
});