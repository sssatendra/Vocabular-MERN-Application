import { ActionTypes } from "../constants/action-types";


const initialState = {
    items: []
}

export const itemReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_ITEMS:
            return { ...state, items: payload };
        // case ActionTypes.SELECTED_ITEM:
        //     return state;
        default:
            return state;
    }
}