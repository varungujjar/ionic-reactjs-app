import { config } from "../../config/config";
import { setToast } from "../../components/Toast";

export const showNotificationAction = (messageObject) => {
  return {
    type: config.showNotification,
    payload: messageObject,
  };
};

export const clearNotificationAction = (messageObject) => {
  return {
    type: config.clearNotification,
    payload: messageObject,
  };
};

export const logoutAction = () => {
  return (dispatch) => {
    setToast(dispatch, { message: "Logged out successfully.", type: "success" });
    return dispatch({
      type: "AUTH_LOGOUT",
    });
  };
};

export const loginAction = (sessionObject = {}) => {
  return (dispatch) => {
    if (sessionObject.name) {
      setToast(dispatch, { message: `Welcome back ${sessionObject.name}`, type: "success" });
    }

    return dispatch({
      type: "AUTH_LOGIN",
      payload: sessionObject,
    });
  };
};
