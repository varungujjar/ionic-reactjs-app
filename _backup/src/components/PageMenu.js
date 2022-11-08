import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonAvatar,
} from "@ionic/react";

import { useEffect, useState, useContext } from "react";
import GlobalContext from "../helpers/Context";
import { Url, Notification, Loading } from "../helpers/Util";

import { useLocation } from "react-router-dom";
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

  // {
  //   title: "Championships",
  //   url: "/page/championships",
  //   iosIcon: globeOutline,
  //   mdIcon: globeSharp,
  // },
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
  const authGlobalContext = useContext(GlobalContext);
  const [user, setUser] = useState(false);

  const getSession = () => {
    if (authGlobalContext.db) {
      const getLocalstorage = async () => {
        const UserSession = await authGlobalContext.db.get("UserSession");
        setUser(UserSession);
      };
      getLocalstorage();
    }
  };

  const UserProfileImage = ({ user }) => {
    if (user && Object.keys(user).length > 0) {
      const image_src = user.profile_image.rawvalue
        ? Url + JSON.parse(user.profile_image.rawvalue)["imagefile"]
        : "./assets/images/article-no-image.png";
      return <img src={image_src} alt={user.username} />;
    } else {
      return (
        <img src="./assets/images/article-no-image.png" alt="not-loggedin" />
      );
    }
  };

  useEffect(() => {
    getSession();
  }, [authGlobalContext.userAuthRefresh]);

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <div className="profile-container">
            <IonMenuToggle key={0} autoHide={false}>
              <IonItem
                routerLink={user ? "/page/profile" : "/page/login"}
                routerDirection="forward"
                lines="none"
                detail={false}
                animated="true"
              >
                <IonAvatar>
                  <UserProfileImage user={user} />
                </IonAvatar>
                <div>
                  <IonListHeader>
                    Hi, {user ? user.name : "Guest"}
                  </IonListHeader>
                  <IonNote>{user ? user.username : "View Profile"}</IonNote>
                </div>
              </IonItem>
            </IonMenuToggle>
          </div>

          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="forward"
                  lines="none"
                  detail={false}
                  animated="true"
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Community</IonListHeader>
          {communityPages.map((appPage, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem
                className={location.pathname === appPage.url ? "selected" : ""}
                routerLink={appPage.url}
                routerDirection="forward"
                lines="none"
                detail={false}
                key={index}
              >
                <IonIcon
                  slot="start"
                  ios={appPage.iosIcon}
                  md={appPage.mdIcon}
                />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Information</IonListHeader>
          {infoPages.map((appPage, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem
                className={location.pathname === appPage.url ? "selected" : ""}
                routerLink={appPage.url}
                routerDirection="forward"
                lines="none"
                detail={false}
                key={index}
              >
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>

        {user && (
          <IonList id="labels-list">
            <IonListHeader>Account</IonListHeader>
            <IonMenuToggle key={0} autoHide={false}>
              <IonItem
                routerDirection="forward"
                lines="none"
                detail={false}
                routerLink={"/page/logout"}
              >
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
