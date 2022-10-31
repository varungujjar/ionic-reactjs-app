import { useEffect, useState, useContext } from "react";
import {
  IonInput,
  IonTextarea,
  IonButtons,
  useIonToast,
  IonButton,
  useIonLoading,
  IonIcon,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonBackButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import { person, arrowBackSharp, camera, pencil } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { Url, LoaderOptions } from "../helpers/Util";
import OwlCarousel from "react-owl-carousel";
import GlobalContext from "../helpers/Context";
import { useForm, Controller } from "react-hook-form";

const Profile = () => {
  const [items, setItems] = useState(false);
  const [showLoader, hideLoader] = useIonLoading();
  const [dataloaded, setDataloaded] = useState(false);
  const [edit, setEdit] = useState(false);
  const authGlobalContext = useContext(GlobalContext);
  const history = useHistory();
  const [present] = useIonToast();

  const presentToast = (message, type = null) => {
    present({
      message: message,
      duration: 2000,
      position: "bottom",
      color: type ? type : "info",
    });
  };

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

  const UserProfileImage = ({ items }) => {
    const image_src = items.profile_image.rawvalue
      ? Url + JSON.parse(items.profile_image.rawvalue)["imagefile"]
      : "./assets/images/article-no-image.png";
    return (
      <>
        <div className="edit-image">
          <IonIcon icon={camera} />
          <input
            type="file"
            name="profile_image"
            onChange={(event) => onFileChange(event)}
          />
        </div>
        <img src={image_src} alt={items.username} />
      </>
    );
  };

  const UserCover = ({ items }) => {
    const image_src = items.cover_image.rawvalue
      ? Url + JSON.parse(items.cover_image.rawvalue)["imagefile"]
      : "./assets/images/article-no-image.png";
    return (
      <>
        <div className="edit-image">
          <IonIcon icon={camera} />
          <input
            type="file"
            name="cover_image"
            onChange={(event) => onFileChange(event)}
          />
        </div>
        <img src={image_src} alt={items.username} />
      </>
    );
  };

  const UserGames = ({ items }) => {
    const options = {
      items: 1,
      stagePadding: 50,
      margin: 20,
      autoplay: false,
      slideBy: 1,
      dots: true,
    };
    return (
      <OwlCarousel className="game-slider owl-theme" {...options}>
        {Object.keys(items).length > 0 &&
          items.map((game, index) => {
            // const images = JSON.parse(article['images']);
            const image_src = game.image
              ? Url + game.image
              : "./assets/images/article-no-image.png";

            return (
              <div className="slider-item item" key={index}>
                <img src={image_src} alt={game.alias} />
                <div className="slider-item-container">
                  <div className="slider-item-title">{game.title}</div>
                </div>
              </div>
            );
          })}
      </OwlCarousel>
    );
  };

  const getSession = (event = {}) => {
    const getLocalstorage = async () => {
      showLoader(LoaderOptions);
      if (authGlobalContext.db) {
        const UserSession = await authGlobalContext.db.get("UserSession");
        if (UserSession) {
          setItems(UserSession);
          hideLoader();
        } else {
          setItems(false);
          hideLoader();
          history.push("/page/login");
        }
      }

      if (Object.keys(event).length > 0) {
        event.detail.complete();
      }
    };
    getLocalstorage();
  };

  const submitForm = (formdata) => {
    const getLocalstorage = async () => {
      showLoader(LoaderOptions);
      if (authGlobalContext.db) {
        const UserSession = await authGlobalContext.db.get("UserSession");
        if (UserSession) {
          fetch(
            Url +
              "index.php?option=com_ajax&group=system&plugin=ajax&format=json&type=profile&uid=" +
              UserSession.id +
              "&session=" +
              UserSession.session,
            {
              method: "POST",
              body: formdata,
              headers: {},
            }
          )
            .then(function (response) {
              return response.json();
            })
            .then(function (resultData) {
              hideLoader();
              setEdit(false);

              if (resultData["message"]) {
                presentToast(resultData["message"]);
              }

              if (resultData["messages"]) {
                for (const [key, value] of Object.entries(
                  resultData["messages"]
                )) {
                  value.forEach((message) => {
                    presentToast(message, key);
                  });
                }
              }
              authGlobalContext.setUserAuthRefresh(true);
            })
            .catch((error) => {
              presentToast(error.toString(), "danger");
              hideLoader();
            });
        } else {
          hideLoader();
          history.push("/page/login");
        }
      }
    };
    getLocalstorage();
  };

  const onFormSubmit = (formdata) => {
    let formData = new FormData();
    for (let key in formdata) {
      formData.append(key, formdata[key]);
    }
    submitForm(formData);
  };

  const onFileChange = (event) => {
    let formdata = new FormData();
    formdata.append(event.target.name, event.target.files[0]);
    submitForm(formdata);
  };

  const doRefresh = (event) => {
    authGlobalContext.setUserAuthRefresh(true);
    if (Object.keys(event).length > 0) {
      event.detail.complete();
    }
  };

  useEffect(() => {
    if (!authGlobalContext.userAuthRefresh) {
      reset();
      hideLoader();
      getSession();
    }
  }, [authGlobalContext.userAuthRefresh]);

  return edit && Object.keys(items).length > 0 ? (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              onClick={() => {
                setEdit(false);
              }}
            >
              <IonIcon icon={arrowBackSharp}></IonIcon>
            </IonButton>
          </IonButtons>
          <div className="IonTitleWrapper">
            <IonTitle> Edit Profile</IonTitle>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="profile-wrapper mt-2">
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Controller
              control={control}
              name="name"
              rules={{ required: false }}
              defaultValue={items.name}
              render={({ field: { value, onBlur, onChange } }) => (
                <IonInput
                  type="text"
                  value={value}
                  onIonBlur={onBlur}
                  onInput={onChange}
                  onIonChange={onChange}
                  placeholder="Full Name"
                />
              )}
            />

            <Controller
              control={control}
              name="biography"
              rules={{ required: false }}
              defaultValue={items.biography.rawvalue}
              render={({ field: { value, onBlur, onChange } }) => (
                <IonTextarea
                  value={value}
                  onIonBlur={onBlur}
                  onInput={onChange}
                  onIonChange={onChange}
                  placeholder="Biography"
                />
              )}
            />

            <IonButton expand="block" type="submit" class="w-100">
              Save
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  ) : (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            {/* <IonButton routerLink={'/page/home'}><IonIcon icon={arrowBackSharp}></IonIcon></IonButton> */}
          </IonButtons>
          <div className="IonTitleWrapper">
            <IonIcon icon={person}></IonIcon>
            <IonTitle> Profile</IonTitle>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {Object.keys(items).length > 0 && (
          <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
        )}

        {Object.keys(items).length > 0 && (
          <>
            <div className="cover-img">
              <UserCover items={items} />
            </div>
            <div className="profile-img">
              <UserProfileImage items={items} />
            </div>
            {/* <IonButton onClick={()=> {setEdit(true)}} >Edit </IonButton> */}
            <div className="article-wrapper mt-2">
              <div className="text-highlight ">{items["name"]}</div>
              <div className="article-title mb-1">{items["username"]}</div>
              <div className="article-desc mt-2">
                <div className="edit-wrapper">
                  <h3 className="mb-1">Biography</h3>{" "}
                  <div
                    className="edit-text"
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    <IonIcon icon={pencil} />
                  </div>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: items.biography.rawvalue
                      ? items.biography.rawvalue
                      : "...",
                  }}
                />

                <div className="edit-wrapper">
                  <h3 className="mb-1 mt-2">Games</h3>
                  {/* <div className='edit-text mt-2'><IonIcon icon={pencil}/></div> */}
                </div>

                {Object.keys(items.games).length > 0 ? (
                  <UserGames items={items.games} />
                ) : (
                  <> No Games Added</>
                )}
              </div>
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Profile;
