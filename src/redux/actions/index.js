import { config } from "../../config/config";
import { setToast } from "../../components/Toast";
import api from "../../config/axios";

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
    dispatch({
      type: "AUTH_LOGOUT",
    });
  };
};

export const loginAction = (sessionObject = {}) => {
  return (dispatch) => {
    if (sessionObject.name) {
      setToast(dispatch, { message: `Welcome back ${sessionObject.name}`, type: "success" });
    }

    dispatch({
      type: "AUTH_LOGIN",
      payload: sessionObject,
    });
  };
};

export const refreshSessionAction = (sessionObject = {}) => {
  return async (dispatch) => {
    await api.get(null, { params: { type: "session", session: sessionObject.session, uid: sessionObject.uid } }).then((response) => {
      if (response.data.data && response.data.data.session) {
        dispatch({
          type: "AUTH_REFRESH",
          payload: response.data.data,
        });
      } else {
        // logoutAction();
        dispatch({
          type: "AUTH_LOGOUT",
        });
      }
    });
  };
};
