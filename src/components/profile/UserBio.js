import { IonIcon } from "@ionic/react";
import { pencil } from "ionicons/icons";
import "./UserBio.css";

const UserBiography = ({ bioContent, isLoading, editCallback }) => {
  return (
    <>
      <h6>Biography</h6>
      {!isLoading ? (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: bioContent ? bioContent : "No Biography",
            }}
          />
          <button className="btn btn-primary btn-bio-edit" onClick={editCallback}>
            <IonIcon icon={pencil} />
          </button>
        </>
      ) : (
        <p className="card-text placeholder-glow">
          <span className="placeholder col-7"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-6"></span>
          <span className="placeholder col-7"></span>
          <span className="placeholder col-3"></span>
        </p>
      )}
    </>
  );
};

export default UserBiography;
