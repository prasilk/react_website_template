import { combineReducers } from "redux";
import { alert } from "./alert.reducer";
import { template } from "./template.reducer";

export const rootReducer = combineReducers({
  template,
  alert,
});
