import reducers from "./reducers";
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

export const store = configureStore({ reducer: reducers }, applyMiddleware(thunk));
