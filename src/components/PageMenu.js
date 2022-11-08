import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonAvatar } from "@ionic/react";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../redux/actions";
import { config } from "../config/config";
import {
  documentTextOutline,
  documentTextSharp,
  newspaperSharp,
  newspaperOutline,
  homeOutline,
  homeSharp,
  globeOutline,
  globeSharp,
  schoolOutline,
  schoolSharp,
  filmOutline,
  filmSharp,
} from "ionicons/icons";

import "./PageMenu.css";

const appPages = [
  {
    title: "Home",
    url: "/page/home",
    iosIcon: homeOutline,
    mdIcon: homeSharp,
  },
];

const communityPages = [
  {
    title: "Community",
    url: "/page/community",
    iosIcon: newspaperOutline,
    mdIcon: newspaperSharp,
  },
  // {
  //   title: "Education",
  //   url: "/page/education",
  //   iosIcon: schoolOutline,
  //   mdIcon: schoolSharp,
  // },

  {
    title: "Articles",
    url: "/page/articles",
    iosIcon: documentTextOutline,
    mdIcon: documentTextSharp,
  },

  {
    title: "Videos",
    url: "/page/videos",
    iosIcon: filmOutline,
    mdIcon: filmSharp,
  },

  {
    title: "News",
    url: "/page/news",
    iosIcon: newspaperOutline,
    mdIcon: newspaperSharp,
  },
];

const infoPages = [
  {
    title: "About Us",
    url: "/page/aboutus",
    iosIcon: newspaperOutline,
    mdIcon: newspaperSharp,
  },

  {
    title: "Leadership",
    url: "/page/leadership",
    iosIcon: newspaperOutline,
    mdIcon: newspaperSharp,
  },

  {
    title: "Contact Us",
    url: "/page/contact",
    iosIcon: newspaperOutline,
    mdIcon: newspaperSharp,
  },

  {
    title: "Privacy Policy",
    url: "/page/privacy",
    iosIcon: "",
    mdIcon: "",
  },

  {
    title: "Terms & Conditions",
    url: "/page/terms",
    iosIcon: "",
    mdIcon: "",
  },
];

const PageMenu = () => {
  const location = useLocation();
  let history = useHistory();

  const reduxDispatch = useDispatch();
  const { storeAuth } = useSelector((state) => {
    return state;
  });

  const handleLogout = () => {
    reduxDispatch(logoutAction());
    history.push("/");
  };

  const UserProfileImage = ({ user }) => {
    if (user && Object.keys(user).length > 0) {
      const image_src = user.profile_image.rawvalue ? config.baseUrl + JSON.parse(user.profile_image.rawvalue)["imagefile"] : "./assets/images/article-no-image.png";
      return <img src={image_src} alt={user.username} />;
    } else {
      return <img src="./assets/images/article-no-image.png" alt="not-loggedin" />;
    }
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <div className="profile-container">
            <IonMenuToggle key={0} autoHide={false}>
              {storeAuth.isLoggedin ? (
                <IonItem routerLink="/page/profile" routerDirection="forward" lines="none" detail={false} animated="true">
                  <IonAvatar>
                    <img src="./assets/images/article-no-image.png" alt="not-loggedin" />
                  </IonAvatar>
                  <div>
                    <IonListHeader>Hi, {storeAuth.userSession.name}</IonListHeader>
                    <IonNote>{storeAuth.userSession.username}</IonNote>
                  </div>
                </IonItem>
              ) : (
                <IonItem routerLink="/page/login" routerDirection="forward" lines="none" detail={false} animated="true">
                  <IonAvatar>
                    <img src="./assets/images/article-no-image.png" alt="not-loggedin" />
                  </IonAvatar>
                  <div>
                    <IonListHeader>Hi, Guest</IonListHeader>
                    <IonNote>Login</IonNote>
                  </div>
                </IonItem>
              )}
            </IonMenuToggle>
          </div>
        </IonList>

        <IonList>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false} class="mt-5">
                <IonItem className={location.pathname === appPage.url ? "selected" : ""} routerLink={appPage.url} routerDirection="forward" lines="none" detail={false} animated="true">
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList>
          <IonListHeader>Community</IonListHeader>
          {communityPages.map((appPage, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem className={location.pathname === appPage.url ? "selected" : ""} routerLink={appPage.url} routerDirection="forward" lines="none" detail={false} key={index}>
                <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>

        <IonList>
          <IonListHeader>Information</IonListHeader>
          {infoPages.map((appPage, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem className={location.pathname === appPage.url ? "selected" : ""} routerLink={appPage.url} routerDirection="forward" lines="none" detail={false} key={index}>
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>

        {storeAuth.isLoggedin && (
          <IonList>
            <IonListHeader>Account</IonListHeader>
            <IonMenuToggle key={0} autoHide={false}>
              <IonItem routerDirection="forward" lines="none" detail={false} onClick={handleLogout}>
                <IonLabel>Logout</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        )}
      </IonContent>
    </IonMenu>
  );
};
export default PageMenu;
