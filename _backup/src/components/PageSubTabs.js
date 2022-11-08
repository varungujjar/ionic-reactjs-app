import React from "react";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";
import "./PageSubTabs.css";

const PageSubTabs = ({
  tabItems,
  tabDefaultTitle,
  tabDefaultTitleValue,
  tabActiveValue,
  tabIsLoading,
  tabOnChange,
}) => {
  return !tabIsLoading ? (
    <IonSegment
      scrollable
      value={tabActiveValue}
      onIonChange={(e) => tabOnChange(e.detail.value)}
      key="tabLoaded"
    >
      <IonSegmentButton value={tabDefaultTitleValue} key="0">
        <IonLabel>{tabDefaultTitle}</IonLabel>
      </IonSegmentButton>
      {Object.keys(tabItems).length > 0 &&
        tabItems.map((item, index) => {
          return (
            <IonSegmentButton value={item.id} key={item.id}>
              <IonLabel>{item.title}</IonLabel>
            </IonSegmentButton>
          );
        })}
    </IonSegment>
  ) : (
    <IonSegment scrollable key="tabLoading">
      <IonSegmentButton key="1">
        <span className="placeholder col-7"></span>
      </IonSegmentButton>
      <IonSegmentButton key="2">
        <span className="placeholder col-7"></span>
      </IonSegmentButton>
      <IonSegmentButton key="3">
        <span className="placeholder col-7"></span>
      </IonSegmentButton>
      <IonSegmentButton key="4">
        <span className="placeholder col-7"></span>
      </IonSegmentButton>
    </IonSegment>
  );
};

PageSubTabs.defaultProps = {
  tabItems: {},
  tabDefaultTitle: "Featured",
  tabDefaultTitleValue: 0,
  tabActiveValue: 0,
  tabIsLoading: false,
};

export default PageSubTabs;
