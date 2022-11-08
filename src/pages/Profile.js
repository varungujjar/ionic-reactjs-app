import React, { useEffect } from "react";
import AccessControl from "../auth/AccessControl";
import PageLayout from "../components/PageLayout";

const Profile = ({ storeAuth }) => {
  useEffect(() => {
    console.log("loaded profile");
  }, []);
  return <PageLayout title={"Profile"}>Hey Profile Page</PageLayout>;
};

export default Profile;
