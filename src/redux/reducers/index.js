import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import notificationReducer from "./notificationReducer";

export default combineReducers({
  storeAuth: authReducer,
  storeNotifications: notificationReducer,
});
