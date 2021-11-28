import { combineReducers } from "redux";
import classReducer from "./classReducer.js";
import loadingReducer from "./loadingReducer.js";
import authReducer from "./authReducer.js";
import userReducer from "./userReducer.js";

export const reducers= combineReducers({classReducer,loadingReducer,authReducer,userReducer});