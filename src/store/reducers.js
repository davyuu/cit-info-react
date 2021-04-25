import { combineReducers } from "redux";
import { actions } from "./actions";

const initialState = {
  data: [],
  loading: false
}

function pages(state = initialState, action) {
  switch (action.type) {
    case actions.SAVE:
      return { ...state, data: action.payload };
    case actions.LOADED:
      return { ...state, loading: true };
    default:
      return state;
  }
}

export default combineReducers({ pages })