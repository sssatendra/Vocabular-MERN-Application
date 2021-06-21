import { combineReducers } from "redux";
import { itemReducer } from "./itemReducer";

const reducers = combineReducers({
    allItems: itemReducer,
})

export default reducers;