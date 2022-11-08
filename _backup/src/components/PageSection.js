import { IonButton } from "@ionic/react";

export const PageSection = ({ title, link }) => {
  return (
    <div className="d-flex align-items-center mt-3">
      <div>
        <h5>{title}</h5>
      </div>

      {link && (
        <div className="ms-auto">
          <IonButton routerLink={link}>View All</IonButton>
        </div>
      )}
    </div>
  );
};
