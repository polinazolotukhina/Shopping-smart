import {
    ITEM_SAVE,
    ITEM_FETCH_SECCESS,
    ITEM_EDIT
} from '../constants/actionTypes';
import initialState from './initialState';

export default function appReducer(state = initialState.items, action) {
    switch (action.type) {
        case ITEM_SAVE:
            return {
                ...state,
            };
        case ITEM_FETCH_SECCESS:
            return {
                ...state,
                items: action.payload
            };
        case ITEM_EDIT:
            return {
                ...state,
                editItem: action.editItem
            };
        default:
            return state;
    }
}
