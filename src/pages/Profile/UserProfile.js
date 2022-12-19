import { config } from "../../config/config";
import { IonIcon } from "@ionic/react";
import { camera } from "ionicons/icons";
import "./UserProfile.css";

const UserProfile = ({ image, username, name, isLoading, editCallback }) => {
  const imagesDecode = JSON.parse(image);
  const image_src = imagesDecode.imagefile && config.baseUrl + imagesDecode.imagefile;
  return !isLoading ? (
    <div className="profile-image">
      <div className="profile-image-wrapper">
        <img src={image_src} alt={username} className="articleImage" />
        <button className="btn-profile-image-edit btn btn-primary" onClick={editCallback}>
          <IonIcon icon={camera} />
        </button>
      </div>

      <div className="profile-details-wrapper">
        <h5>{username}</h5>
        <span className="profile-name">{name}</span>
      </div>
    </div>
  ) : (
    <UserProfilePlaceholder />
  );
};

UserProfile.defaultProps = {
  image: JSON.stringify({}),
  username: "",
  name: "",
  isLoading: true,
};

export default UserProfile;

const UserProfilePlaceholder = () => {
  return (
    <div className="profile-image">
      <img src="./assets/images/article-no-image.png" alt="" />
      <div className="profile-details-wrapper w-50 placeholder-glow">
        <h5>
          <span className="placeholder col-7"></span>
        </h5>
        <span className="profile-name">
          <span className="placeholder col-2"></span>
        </span>
      </div>
    </div>
  );
};
