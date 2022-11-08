import { useEffect, useState } from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { RenderToast } from "./components/Toast";

import PageMenu from "./components/PageMenu";
import PageTabs from "./components/PageTabs";

import Home from "./pages/Home";
import Static from "./pages/Static";
import Article from "./pages/Article";
import Articles from "./pages/Articles";

import Videos from "./pages/Videos";
import Gamer from "./pages/Gamer";
import Contact from "./pages/Contact";

import Login from "./auth/Login";
import Register from "./auth/Register";
import Profile from "./pages/Profile";
import Bookmarks from "./pages/Bookmarks";
import GlobalContext from "./helpers/Context";
import { Auth, Logout } from "./auth/Auth";
import { Storage, Drivers } from "@ionic/storage";

import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Plugins CSS  */
import "./boostrap/bootstrap.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "@fancyapps/ui/dist/fancybox.css";

setupIonicReact();

const App = () => {
  // usePageViews();
  const [userAuthSession, setUserAuthSession] = useState("");
  const [userAuthRefresh, setUserAuthRefresh] = useState(true);
  const [db, setDb] = useState(null);

  const [toastMessages, setToastMessages] = useState();

  // var storage = false;
  // const history = useHistory();
  // const [currentUrl, setCurrentUrl] = useState(history.location.pathname);

  // const createStore = (name = "__mydb") => {
  //   storage = new Storage({
  //     name,
  //     driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
  //   });
  //   storage.create();
  //   setDb(storage);
  // };

  // function usePageViews() {
  //   let location = useLocation();
  //   React.useEffect(() => {
  //     ga.send(["pageview", location.pathname]);
  //   }, [location]);
  // }

  useEffect(() => {
    // createStore();
  }, []);

  return (
    //Make all states globally available
    <GlobalContext.Provider
      value={{
        db,
        setDb,
        userAuthSession,
        setUserAuthSession,
        userAuthRefresh,
        setUserAuthRefresh,
        toastMessages,
        setToastMessages,
      }}
    >
      {toastMessages && <RenderToast message={toastMessages.message} type={toastMessages.type} onDismiss={() => setToastMessages(null)} />}
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <PageMenu />
            <PageTabs>
              <IonRouterOutlet id="main">
                <Route path="/" exact={true}>
                  <Redirect to="/page/home" />
                </Route>
                <Route path="/page/home" exact={true}>
                  <Home />
                </Route>
                <Route path="/page/aboutus" exact={true}>
                  <Static id="1" />
                </Route>
                <Route path="/page/leadership" exact={true}>
                  <Static id="49" />
                </Route>
                <Route path="/page/community" exact={true}>
                  <Static id="3" />
                </Route>
                <Route path="/page/privacy" exact={true}>
                  <Static id="19" />
                </Route>
                <Route path="/page/terms" exact={true}>
                  <Static id="20" />
                </Route>
                <Route path="/page/contact" exact={true} component={Contact} />
                <Route path="/page/news" exact={true}>
                  <Articles catRef="news" />
                </Route>
                <Route path="/page/news/:id" exact={true} component={Article} />
                <Route path="/page/articles" exact={true}>
                  <Articles catRef="articles" />
                </Route>
                <Route path="/page/articles/:id" exact={true} component={Article} />
                <Route path="/page/videos" exact={true} component={Videos} />
                <Route path="/page/gamer/:id" exact={true} component={Gamer} />
                <Route path="/page/register" exact={true} component={Register} />
                <Route path="/page/login" exact={true} component={Login} />
                <Route path="/page/logout" exact={true} component={Logout} />
                <Route path="/page/bookmarks" exact={true} component={Bookmarks}></Route>
                <Route path="/page/profile" exact={true} component={Profile}></Route>
                {/* <Route path="/page/bookmarks" exact={true} render={() => { return auth ? <Bookmarks/> : <Redirect to="/page/login" /> }}></Route> */}
              </IonRouterOutlet>
            </PageTabs>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </GlobalContext.Provider>
  );
};

export default App;
