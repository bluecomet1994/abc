import { combineReducers, createStore } from "redux";
import user from "./user.reducer";

const store = createStore(
  combineReducers({ user })
);

export default store;