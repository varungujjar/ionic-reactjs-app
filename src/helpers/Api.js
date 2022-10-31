import { Url, LoaderOptions } from "./Util";
import { useContext, useEffect } from "react";
import GlobalContext from "./Context";
import { useIonLoading, useIonToast } from "@ionic/react";
import { useHistory } from "react-router-dom";

let api =
  Url + "index.php?option=com_ajax&group=system&plugin=ajax&format=json";
// let joomlatoken = 'c2hhMjU2OjQyMDpkYzM2ZTBhYTRjYmJkZjBiNmI2NWU1MzE1MmQ4YTI4NmY2NTI3MWUyMTFkZTFlODBjNDM3MjNmYzE2ZjhmMGY2';

export const ApiItem = (
  type = null,
  id = null,
  catid = null,
  featured = false,
  callback
) => {
  const _type = type ? "&type=" + type : "";
  const _id = id ? "&id=" + id : "";
  const _catid = catid ? "&catid=" + catid : "";
  const _featured = featured ? "&featured=" + featured : "";
  fetch(api + _type + _id + _catid + _featured, {
    method: "GET",
    headers: {
      // 'Content-Type': 'application/json',
      // 'X-Joomla-Token':token
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      var _json = {
        success: true,
        message: "Server not reachable",
        messages: null,
        data: [],
      };
      myJson["success"] === true ? callback(myJson) : callback(_json);
    })
    .catch((error) => {
      var _json = {
        success: true,
        message: error.toString(),
        messages: null,
        data: [],
      };
      callback(_json);
    });
};

export const ApiAuth = (type = null, data = null, callback) => {
  const _type = type ? "&type=" + type : "";
  const _name = data.name ? "&name=" + data.name : "";
  const _username = data.username ? "&username=" + data.username : "";
  const _email = data.email ? "&email=" + data.email : "";
  const _password = data.password ? "&password=" + data.password : "";
  fetch(api + _type + _name + _username + _email + _password, {
    method: "GET",
    headers: {
      // 'Content-Type': 'application/json',
      // 'X-Joomla-Token':token
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      callback(myJson);
    })
    .catch((error) => {
      var _json = {
        success: true,
        message: error.toString(),
        messages: null,
        data: [],
      };
      callback(_json);
    });
};

export const ApiAuthSession = (
  type = null,
  session = null,
  uid = null,
  callback
) => {
  const _type = type ? "&type=" + type : "";
  const _session = session ? "&session=" + session : "";
  const _uid = uid ? "&uid=" + uid : "";
  fetch(api + _type + _session + _uid, {
    method: "GET",
    headers: {
      // 'Content-Type': 'application/json',
      // 'X-Joomla-Token':token
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      callback(myJson);
    })
    .catch((error) => {
      var _json = {
        success: true,
        message: error.toString(),
        messages: null,
        data: [],
      };
      callback(_json);
    });
};

export const BookmarksStore = (
  content,
  id,
  authGlobalContext,
  showLoader,
  hideLoader,
  presentToast,
  history
) => {
  const getLocalstorage = async () => {
    // showLoader(LoaderOptions);
    if (authGlobalContext.db) {
      const UserSession = await authGlobalContext.db.get("UserSession");
      if (UserSession) {
        fetch(
          Url +
            "index.php?option=com_ajax&group=system&plugin=ajax&format=json&type=bookmark&uid=" +
            UserSession.id +
            "&session=" +
            UserSession.session +
            "&content=" +
            content +
            "&id=" +
            id,
          {
            method: "POST",
            // body:formdata,
            headers: {},
          }
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (resultData) {
            if (resultData["message"]) {
              presentToast(resultData["message"]);
            }

            if (resultData["messages"]) {
              for (const [key, value] of Object.entries(
                resultData["messages"]
              )) {
                value.forEach((message) => {
                  presentToast(message, key);
                });
              }
            }

            authGlobalContext.setUserAuthRefresh(true);
          })
          .catch((error) => {
            presentToast(error.toString(), "danger");
            // hideLoader();
            authGlobalContext.setUserAuthRefresh(true);
          });
      } else {
        hideLoader();
        history.push("/page/login");
      }
    }
  };

  getLocalstorage();
};
