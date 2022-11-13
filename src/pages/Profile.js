import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { config } from "../config/config";
import { useForm, Controller } from "react-hook-form";
import { IonInput, IonTextarea, IonButton, IonItem } from "@ionic/react";
import api from "../config/axios";
import { setToast } from "../components/Toast";
import { refreshSessionAction } from "../redux/actions";

import PageLayout from "../components/PageLayout";
import UserProfile from "../components/profile/UserProfile";
import UserCover from "../components/profile/UserCover";
import UserGames from "../components/profile/UserGames";
import UserModal from "../components/profile/UserModal";
import UserBiography from "../components/profile/UserBio";

import "./Profile.css";

const Profile = () => {
  const [userLoading, setUserLoading] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [editProfilePicture, setEditProfilePicture] = useState(false);
  const [editProfileCover, setEditProfileCover] = useState(false);
  // const [userSession, setUserSession] = useState();
  let userForm = {};
  const reduxDispatch = useDispatch();

  const { userSession } = useSelector((state) => {
    return state.storeAuth;
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onChangeFieldFile = (event) => {
    // console.log(userForm);
    // userForm = { ...userForm, [event.target.name]: event.target.files[0] };

    let formdata = new FormData();
    formdata.append(event.target.name, event.target.files[0]);
    userForm = formdata;

    submitForm();
  };

  const onChangeFieldInputs = (event) => {
    userForm = { ...userForm, [event.target.name]: event.target.value };
    console.log(userForm);
  };

  const submitForm = async () => {
    console.log(userForm);

    await api
      .get(null, {
        params: {
          type: config.profile.type,
          uid: userSession.id,
          session: userSession.session,
          ...userForm,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        userForm = {};
        setUserLoading(true);
        setEditProfile(false);
        setToast(reduxDispatch, response.data);
        reduxDispatch(refreshSessionAction({ session: userSession.session, uid: userSession.id }));
      })
      .catch((error) => {
        console.log(error);
        // setToast(reduxDispatch, {
        //   message: error.toJSON().message,
        //   type: "danger",
        // });
      });
  };

  const getProfile = () => {
    setTimeout(() => {
      setUserLoading(false);
    }, config.timeOutDelay);
  };

  useEffect(() => {
    getProfile();
    console.log(userSession);
  }, [userSession]);

  const onPageRefresh = (event) => {
    setUserLoading(true);
    getProfile();
    event.detail.complete();
  };

  return (
    <PageLayout title={"Profile"} showPageRefresh={true} onPageRefresh={onPageRefresh}>
      {console.log(userSession)}

      <UserCover image={userSession.cover_image.rawvalue} alt={userSession.username} isLoading={userLoading} editCallback={() => setEditProfileCover(true)} />
      <UserProfile image={userSession.profile_image.rawvalue} username={userSession.username} name={userSession.name} isLoading={userLoading} editCallback={() => setEditProfilePicture(true)} />
      <UserBiography bioContent={userSession.biography.rawvalue} isLoading={userLoading} editCallback={() => setEditProfile(true)} />
      <UserGames items={userSession.games} isLoading={userLoading} />

      <UserModal
        isOpen={editProfile}
        onDidDismiss={() => {
          setEditProfile(false);
        }}
      >
        <h6 className="text-bold">Edit Profile Details</h6>

        <IonItem>
          <Controller
            control={control}
            name="name"
            rules={{ required: false }}
            defaultValue={userSession.name}
            render={({ field: { value, onBlur, onChange } }) => (
              <IonInput
                type="text"
                value={value}
                onIonBlur={onBlur}
                onInput={(e) => {
                  onChange(e);
                  onChangeFieldInputs(e);
                }}
                onIonChange={onChange}
                placeholder="Full Name"
                name="name"
              />
            )}
          />
        </IonItem>
        <IonItem>
          <Controller
            control={control}
            name="biography"
            rules={{ required: false }}
            defaultValue={userSession.biography.rawvalue}
            render={({ field: { value, onBlur, onChange } }) => (
              <IonTextarea
                value={value}
                onIonBlur={onBlur}
                onInput={(e) => {
                  onChange(e);
                  onChangeFieldInputs(e);
                }}
                onIonChange={onChangeFieldInputs}
                placeholder="Biography"
                name="biography"
              />
            )}
          />
        </IonItem>

        <div className="mt-3">
          <IonButton expand="block" type="submit" class="w-100 fixed-button" onClick={submitForm}>
            Save
          </IonButton>
        </div>
      </UserModal>

      <UserModal
        isOpen={editProfilePicture}
        onDidDismiss={() => {
          setEditProfilePicture(false);
        }}
      >
        <IonButton expand="block" type="submit" class="w-100 fixed-button">
          Upload Profile Picture
          <input type="file" name="profile_image" onChange={onChangeFieldFile} />
        </IonButton>
      </UserModal>

      <UserModal
        isOpen={editProfileCover}
        onDidDismiss={() => {
          setEditProfileCover(false);
        }}
      >
        <IonButton expand="block" type="submit" class="w-100 fixed-button">
          Upload Cover Picture
          <input type="file" name="cover_image" onChange={onChangeFieldFile} />
        </IonButton>
      </UserModal>
    </PageLayout>
  );
};

export default Profile;
