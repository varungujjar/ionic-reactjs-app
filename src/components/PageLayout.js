import React from "react";
import "./OwlCarousel.css";
import PageSubTabs from "./PageSubTabs";

import {
  IonButtons,
  IonIcon,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const PageLayout = ({
  title,
  icon,
  content,
  loader,
  tabShow,
  tabItems,
  tabDefaultTitle,
  tabDefaultTitleValue,
  tabActiveValue,
  tabIsLoading,
  tabOnChange,
  children,
}) => {
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
        <div className="container" style={{ padding: "0px 20px" }}>
          {children ? children : null}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PageLayout;
