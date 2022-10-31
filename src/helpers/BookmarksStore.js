import { Url, LoaderOptions } from "./Util";
import { useContext, useEffect } from "react";
import { useIonLoading, useIonToast } from "@ionic/react";
import { useHistory } from "react-router-dom";
import GlobalContext from "./Context";

const BookmarksStore = (content = null, id = null) => {
  console.log(content);
  console.log(id);

  const [showLoader, hideLoader] = useIonLoading();
  const [present] = useIonToast();
  const history = useHistory();
  const authGlobalContext = useContext(GlobalContext);

  const presentToast = (message, type = null) => {
    authGlobalContext.setUserAuthRefresh(true);
    console.log("here");
    present({
      message: message,
      duration: 2000,
      position: "bottom",
      color: type ? type : "info",
    });
  };

  const getLocalstorage = async () => {
    showLoader(LoaderOptions);
    if (authGlobalContext.db) {
      const UserSession = await authGlobalContext.db.get("UserSession");
      if (UserSession) {
        fetch(
          Url +
            "index.php?option=com_ajax&group=system&plugin=ajax&format=json&type=bookmark&uid=" +
            UserSession.id +
            "&content=" +
            content,
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
            console.log("here");
            authGlobalContext.setUserAuthRefresh(true);
          })
          .catch((error) => {
            presentToast(error.toString(), "danger");
            hideLoader();
          });
      } else {
        hideLoader();
        history.push("/page/login");
      }
    }
  };

  useEffect(() => {
    getLocalstorage();
  }, []);

  return <></>;
};
export default BookmarksStore;
