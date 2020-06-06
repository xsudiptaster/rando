import {
  FETCH_DESCRIBE,
  HIDE_SPINNER,
  METADATALIST_EXPORT,
  SHOW_SPINNER,
} from "../actions/action";

import { combineReducers } from "redux";

// reducers.js
export const data = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DESCRIBE:
      return {
        ...state,
        xmldata: action.value,
      };
    case METADATALIST_EXPORT:
      return {
        ...state,
        metadatalist: action.value,
      };
    case HIDE_SPINNER:
      return {
        ...state,
        visibility: {
          spinner: false,
        },
      };
    case SHOW_SPINNER:
      return {
        ...state,
        visibility: {
          spinner: true,
        },
      };
    default:
      return state;
  }
};

export const reducers = combineReducers({
  data,
});
