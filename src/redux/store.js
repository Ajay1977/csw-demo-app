import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";

export const appStore = createStore(rootReducer, applyMiddleware(thunk));
