import { combineReducers } from "redux";
import { userListReducer } from "./userListReducer";
import { authUserReducer } from "./authUserReducer";

export const rootReducer = combineReducers({
  authUser: authUserReducer,
  usersList: userListReducer,
});
