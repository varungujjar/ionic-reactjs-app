import React from "react";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";

const PageSubTabs = ({
  tabItems,
  tabDefaultTitle,
  tabDefaultTitleValue,
  tabActiveValue,
  tabIsLoading,
  tabOnChange,
}) => {
  return (
    <IonSegment
      scrollable
      value={tabActiveValue}
      onIonChange={(e) => tabOnChange(e.detail.value)}
    >
      <IonSegmentButton value={tabDefaultTitleValue} key="0">
        <IonLabel>{tabDefaultTitle}</IonLabel>
      </IonSegmentButton>
      {Object.keys(tabItems).length > 0 &&
        tabItems.map((item, index) => {
          return (
            <IonSegmentButton value={item.id} key={index + 1}>
              <IonLabel>{item.title}</IonLabel>
            </IonSegmentButton>
          );
        })}
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
