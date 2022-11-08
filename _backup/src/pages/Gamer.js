import React, { useEffect, useState } from "react";
import {
  IonButtons,
  IonIcon,
  IonContent,
  IonHeader,
  IonBackButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import { ApiItem } from "../helpers/Api";
import { Url, Notification, Loading } from "../helpers/Util";
import { person } from "ionicons/icons";
import { useParams, useHistory, useLocation } from "react-router-dom";

const Gamer = () => {
  const { id } = useParams();
  const [items, setItems] = useState({});
  const [showLoader, setshowLoader] = useState(true);
  const [showToast, setshowToast] = useState(true);
  const [showToastMessage, setshowToastMessage] = useState("");

  const doLogin = (id = null, event = {}) => {
    ApiItem("users", id, null, false, (resultData) => {
      if (Object.keys(event).length > 0) {
        event.detail.complete();
      }
      if (resultData["data"]) {
        setItems(resultData["data"]);
        setshowLoader(false);
      } else {
        setshowLoader(false);
        setshowToast(true);
        setshowToastMessage(resultData["message"]);
      }
    });
  };

  let history = useHistory();

  // console.log(location.pathname)
  // console.log(history.location.from)
  // https://stackoverflow.com/questions/39288915/detect-previous-path-in-react-router
  // https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page

  const getData = (id = null, event = {}) => {
    ApiItem("users", id, null, false, (resultData) => {
      if (Object.keys(event).length > 0) {
        event.detail.complete();
      }
      if (resultData["data"]) {
        setItems(resultData["data"]);
        setshowLoader(false);
      } else {
        setshowLoader(false);
        setshowToast(true);
        setshowToastMessage(resultData["message"]);
      }
    });
  };

  const doRefresh = (event) => {
    getData(items["id"], event);
  };

  const UserProfileImage = ({ items }) => {
    const image_src = items["profile-image"]["rawvalue"]
      ? Url + JSON.parse(items["profile-image"]["rawvalue"])["imagefile"]
      : "./assets/images/article-no-image.png";
    return <img src={image_src} alt={items["username"]} />;
  };

  const UserCover = ({ items }) => {
    const image_src = items["cover-image"]["rawvalue"]
      ? Url + JSON.parse(items["cover-image"]["rawvalue"])["imagefile"]
      : "./assets/images/article-no-image.png";
    return <img src={image_src} alt={items["username"]} />;
  };

  useEffect(() => {
    setshowLoader(true);
    setshowToast(false);
    setItems({});
    if (id) {
      getData(id, {});
    }
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/page/home" />
          </IonButtons>
          <div className="IonTitleWrapper">
            <IonIcon icon={person}></IonIcon>
            <IonTitle> Profile</IonTitle>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Loading show={showLoader} />
        <Notification show={showToast} message={showToastMessage} />
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {Object.keys(items).length > 0 && (
          <>
            <div className="cover-img">
              <UserCover items={items} />
            </div>
            <div className="profile-img">
              <UserProfileImage items={items} />
            </div>
            <div className="article-wrapper mt-2">
              <div className="text-highlight ">{items["name"]}</div>
              <div className="article-title mb-1">{items["username"]}</div>
              <div className="article-desc mt-2">
                <h3 className="mb-1">Biography</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: items["biography"]["rawvalue"]
                      ? items["biography"]["rawvalue"]
                      : "...",
                  }}
                />
                <h3 className="mb-1 mt-2">Games</h3>
              </div>
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Gamer;
