import { applyMiddleware, createStore } from "redux";

import { reducers } from "../reducers/reducer";
import thunk from "redux-thunk";

// store.js
export function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState, applyMiddleware(thunk));
  return store;
}

export const store = configureStore();
