import React, { useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import { config } from "../../config/config";
import { UserCardCarousel, UsersCardPlaceholder } from "./UserCard";

const UsersSlider = ({ items = {}, isLoading }) => {
  useEffect(() => {}, [isLoading]);

  return !isLoading ? (
    <OwlCarousel key={0} className="owl-theme" {...config.videocarousel}>
      {Object.keys(items).length > 0 ? (
        items.map((user) => (
          <UserCardCarousel
            key={user.id}
            userFullName={user.name}
            userId={user.id}
            userName={user.username}
            userProfileImage={user["profile-image"]}
          />
        ))
      ) : (
        <>No users to display</>
      )}
    </OwlCarousel>
  ) : (
    <OwlCarousel {...config.videocarousel} key={1}>
      <UsersCardPlaceholder />
      <UsersCardPlaceholder />
    </OwlCarousel>
  );
};
export default UsersSlider;
