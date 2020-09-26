import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { rootReducer } from "../_reducers";

const loggerMiddleware = createLogger();

let middleware = [];
if (process.env.REACT_APP_ENV === "development")
  middleware = [thunkMiddleware, loggerMiddleware];
else middleware = [thunkMiddleware];

export const store = createStore(rootReducer, applyMiddleware(...middleware));
