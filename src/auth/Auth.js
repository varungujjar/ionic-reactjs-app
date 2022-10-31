import { useContext, useState, useEffect } from "react";
import { ApiAuthSession } from "../helpers/Api";
import { useIonToast } from "@ionic/react";
import { useHistory } from "react-router-dom";
import GlobalContext from "../helpers/Context";

import { Url, LoaderOptions } from "../helpers/Util";
let api =
  Url + "index.php?option=com_ajax&group=system&plugin=ajax&format=json";

export const Auth = () => {
  const authGlobalContext = useContext(GlobalContext);
  const [present] = useIonToast();

  const presentToast = (message) => {
    present({
      message: message,
      duration: 1500,
      position: "bottom",
      color: "danger",
    });
  };

  const getLocalstorage = async () => {
    if (authGlobalContext.db) {
      const UserSession = await authGlobalContext.db.get("UserSession");
      // console.log(UserSession);

      if (UserSession) {
        ApiAuthSession(
          "session",
          UserSession["session"],
          UserSession["id"],
          (resultData) => {
            if (resultData["success"]) {
              if (Object.keys(resultData["data"]).length > 0) {
                SyncSession(authGlobalContext, resultData["data"]);
              } else {
                Unsetsession(authGlobalContext);
              }
            }

            if (!resultData["success"]) {
              Unsetsession(authGlobalContext);
            }

            if (resultData["message"]) {
              presentToast(resultData["message"]);
            }
          }
        );
      } else {
        Unsetsession(authGlobalContext);
      }
    }
  };
  getLocalstorage();
};

export const AuthSocial = (data, callback) => {
  var form_data = new FormData();
  for (var key in data) {
    form_data.append(key, data[key]);
  }
  fetch(api, {
    method: "POST",
    body: form_data,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      callback(myJson);
    })
    .catch((error) => {
      var _json = { success: false, message: error.toString() };
      callback(_json);
    });
};

export const Logout = () => {
  const authGlobalContext = useContext(GlobalContext);
  const history = useHistory();
  const [present] = useIonToast();

  const presentToast = (message, type = null) => {
    present({
      message: message,
      duration: 2000,
      position: "bottom",
      color: type ? type : "info",
    });
  };

  const getLocalstorage = async () => {
    if (authGlobalContext.db) {
      const UserSession = await authGlobalContext.db.get("UserSession");

      if (UserSession) {
        ApiAuthSession("logout", UserSession["session"], null, (resultData) => {
          if (resultData["data"]) {
            Unsetsession(authGlobalContext);
            history.push("/page/home");
          }
          if (resultData["message"]) {
            presentToast(resultData["message"]);
          }

          if (resultData["messages"]) {
            for (const [key, value] of Object.entries(resultData["messages"])) {
              value.forEach((message) => {
                presentToast(message, key);
              });
            }
          }
        });
      }
    }
  };
  getLocalstorage();
};

export const SyncSession = (authGlobalContext, resultData) => {
  const setLocalstorage = async () => {
    authGlobalContext.setUserAuthSession(
      await authGlobalContext.db.set("UserSession", resultData)
    );
    authGlobalContext.setUserAuthRefresh(false);
  };
  setLocalstorage();
};

export const SetSession = (authGlobalContext, resultData) => {
  if (!authGlobalContext.userAuthSession) {
    const setLocalstorage = async () => {
      authGlobalContext.setUserAuthSession(
        await authGlobalContext.db.set("UserSession", resultData)
      );
      authGlobalContext.setUserAuthRefresh(true);
    };
    setLocalstorage();
  } else {
    SyncSession(authGlobalContext, resultData);
  }
};

export const Unsetsession = (authGlobalContext) => {
  if (authGlobalContext.userAuthSession) {
    const unsetLocalstorage = async () => {
      authGlobalContext.setUserAuthSession(
        await authGlobalContext.db.set("UserSession", false)
      );
      authGlobalContext.setUserAuthRefresh(true);
    };
    unsetLocalstorage();
  }
};
