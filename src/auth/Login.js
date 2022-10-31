import { useEffect, useState, useContext } from "react";
import {
  IonButtons,
  useIonLoading,
  useIonToast,
  IonGrid,
  IonButton,
  IonBadge,
  IonLabel,
  IonRow,
  IonInput,
  IonItem,
  IonCol,
  IonIcon,
  IonContent,
  IonHeader,
  IonBackButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ApiAuth } from "../helpers/Api";
import { Notification, Loading } from "../helpers/Util";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import GlobalContext from "../helpers/Context";
import { SetSession, AuthSocial } from "./Auth";
import { Link } from "react-router-dom";
import { logoFacebook, logoGoogle } from "ionicons/icons";
import { LoaderOptions } from "../helpers/Util";

import {
  FacebookLogin,
  FacebookLoginResponse,
} from "@capacitor-community/facebook-login";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

const Login = () => {
  const [showLoader, hideLoader] = useIonLoading();
  let history = useHistory();
  const [present] = useIonToast();
  const authGlobalContext = useContext(GlobalContext);
  const [jsonme, setJsonme] = useState("");
  const [facebookSession, setFacebookSession] = useState(false);
  GoogleAuth.initialize();

  const presentToast = (message, type = null) => {
    present({
      message: message,
      duration: 2000,
      position: "bottom",
      color: type ? type : "danger",
    });
  };

  const handleLogin = () => {};

  const onSubmit = (data) => {
    showLoader(LoaderOptions);
    ApiAuth("login", data, (resultData) => {
      if (resultData["message"]) {
        presentToast(resultData["message"]);
      }
      if (resultData["data"]) {
        SetSession(authGlobalContext, resultData["data"]); //authGlobalContext is important or else it wont work
        resultData["data"]["username"]
          ? history.push("/page/profile")
          : history.push("/page/home");
      }
      hideLoader();
    });
  };

  // const getCurrentToken = async() => {
  //     const result = await this.fbLogin.getCurrentAccessToken();

  //     if (result.accessToken) {
  //       this.token = result.accessToken;
  //       this.loadUserData();
  //     } else {
  //       // Not logged in.
  //     }
  //   }

  const socialLogin = async (platform) => {
    const doAuthSocial = (socialData) => {
      showLoader(LoaderOptions);
      AuthSocial(socialData, (apiResponse) => {
        hideLoader();
        if (apiResponse.message) {
          presentToast(apiResponse.message);
        }

        if (apiResponse.messages) {
          for (const [key, value] of Object.entries(apiResponse.messages)) {
            value.forEach((message) => {
              presentToast(message, key);
            });
          }
        }

        if (apiResponse.success == true && apiResponse.data) {
          SetSession(authGlobalContext, apiResponse.data); //authGlobalContext is important or else it wont work
          history.push("/page/profile");
        }
      });
    };

    let socialData = {};

    if (platform == "facebook") {
      const FACEBOOK_PERMISSIONS = ["public_profile", "email"];
      const _response = await FacebookLogin.login({
        permissions: FACEBOOK_PERMISSIONS,
      });
      if (_response.accessToken) {
        setFacebookSession(_response.accessToken);
        const response = await FacebookLogin.getProfile({
          fields: ["email", "name", "picture"],
        });
        socialData["type"] = "social";
        socialData["platform"] = platform;
        socialData["token"] = JSON.stringify(_response.accessToken);
        socialData["name"] = response.name;
        socialData["email"] = response.email;
        socialData["id"] = response.id;
        socialData[
          "image"
        ] = `http://graph.facebook.com/${response.id}/picture?type=large`;
        doAuthSocial(socialData);
      }
    }

    if (platform == "google") {
      const response = await GoogleAuth.signIn();
      if (response) {
        socialData["type"] = "social";
        socialData["platform"] = platform;
        socialData["token"] = JSON.stringify(response.authentication);
        socialData["name"] = response.name;
        socialData["email"] = response.email;
        socialData["id"] = response.id;
        socialData["image"] = response.imageUrl;
        doAuthSocial(socialData);
      }
    }
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {}, [jsonme]);

  return (
    <IonPage className="ion-page login-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/page/home" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="login-container center-container">
          <div className="logo">
            <img src="./assets/images/about-weare.png" alt="logo" />
          </div>
          <h2>Login</h2>
          <p className="mb-2 text-muted">
            To view or manage your profile <br></br>you will need to login.
            {JSON.stringify(jsonme)}
          </p>
          <img src={jsonme.picture ? jsonme.picture.data.url : ""} />
          <div className="social-login">
            <IonButton
              onClick={() => {
                socialLogin("facebook");
              }}
            >
              <IonIcon icon={logoFacebook}></IonIcon>
            </IonButton>
            <IonButton
              onClick={() => {
                socialLogin("google");
              }}
            >
              <IonIcon icon={logoGoogle}></IonIcon>
            </IonButton>

            <div className="subtitle fancy">
              <span>Or</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <IonItem>
              <Controller
                control={control}
                name="username"
                rules={{ required: true }}
                render={({ field: { value, onBlur, onChange } }) => (
                  <IonInput
                    type="text"
                    onIonBlur={onBlur}
                    value={value}
                    onInput={onChange}
                    onIonChange={onChange}
                    placeholder="Username"
                  />
                )}
              />
              {errors.username && (
                <div className="input-error">Username is required</div>
              )}
            </IonItem>
            <IonItem>
              <Controller
                control={control}
                name="password"
                rules={{ required: true }}
                render={({ field: { value, onBlur, onChange } }) => (
                  <IonInput
                    type="password"
                    onIonBlur={onBlur}
                    value={value}
                    onInput={onChange}
                    onIonChange={onChange}
                    placeholder="Password"
                  />
                )}
              />
              {errors.password && (
                <div className="input-error">Password is required</div>
              )}
            </IonItem>
            <IonButton expand="block" type="submit" class="w-100">
              Sign In
            </IonButton>
            <p style={{ fontSize: "medium" }}>
              Don't have an account yet?{" "}
              <Link to="/page/register" className="text-highlight">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
