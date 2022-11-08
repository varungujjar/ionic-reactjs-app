import React from "react";
import "./OwlCarousel.css";
import PageSubTabs from "./PageSubTabs";

import { IonButtons, IonIcon, IonRefresherContent, IonRefresher, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import Toast from "./Toast";

const PageLayout = ({ title, icon, tabShow, tabItems, tabDefaultTitle, tabDefaultTitleValue, tabActiveValue, tabIsLoading, tabOnChange, showPageRefresh, onPageRefresh, children }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          {/* <IonIcon icon={documentText}></IonIcon> */}
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
        {tabShow && (
          <PageSubTabs
            tabItems={tabItems}
            tabDefaultTitle={tabDefaultTitle}
            tabDefaultTitleValue={tabDefaultTitleValue}
            tabActiveValue={tabActiveValue}
            tabIsLoading={tabIsLoading}
            tabOnChange={(value) => tabOnChange(value)}
          />
        )}
      </IonHeader>
      <IonContent fullscreen>
        {showPageRefresh && (
          <IonRefresher slot="fixed" onIonRefresh={onPageRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
        )}
        <div className="container" style={{ padding: "0px 20px" }}>
          {children ? children : null}
        </div>
      </IonContent>
    </IonPage>
  );
};

PageLayout.defaultProps = {
  title: "",
  icon: "",
  tabShow: false,
  tabItems: {},
  tabDefaultTitle: "",
  tabDefaultTitleValue: null,
  tabActiveValue: null,
  tabIsLoading: false,
  showPageRefresh: false,
  authEnabled: false,
  authState: false,
};

export default PageLayout;
