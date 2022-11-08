import {
  IonItem,
  IonIcon,
  IonButtons,
  useIonToast,
  useIonLoading,
  IonButton,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonBackButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import { useEffect, useState, useContext } from "react";
import { Formatdate } from "../helpers/Util";
import { Fancybox } from "@fancyapps/ui";
import { playCircle, bookmark, starOutline, star } from "ionicons/icons";
import { Truncate, Url } from "../helpers/Util";
import { useHistory } from "react-router-dom";
import { LoaderOptions } from "../helpers/Util";
import GlobalContext from "../helpers/Context";
import "@fancyapps/ui/dist/fancybox.css";
import { BookmarksStore } from "../helpers/Api";

const Bookmarks = () => {
  const [items, setItems] = useState({});
  const [tab, setTab] = useState("articles");
  const [showLoader, hideLoader] = useIonLoading();
  const [dataloaded, setDataloaded] = useState(false);
  const authGlobalContext = useContext(GlobalContext);
  const history = useHistory();
  const [present] = useIonToast();
  const [bookmarksArticles, setBookmarksArticles] = useState([]);
  const [bookmarksNews, setBookmarksNews] = useState([]);
  const [bookmarksVideos, setBookmarksVideos] = useState([]);

  const presentToast = (message, type = null) => {
    present({
      message: message,
      duration: 2000,
      position: "bottom",
      color: type ? type : "danger",
    });
  };

  const playVideo = (videoId) => {
    const video_src =
      "https://www.youtube.com/watch?v=" +
      videoId +
      "&autoplay=1&color=white&modestbranding=1";
    Fancybox.show([
      {
        src: video_src,
        type: "youtube",
      },
    ]);
  };

  const Articles = ({ data }) => {
    return Object.keys(data).length > 0 ? (
      data.map((article, index) => {
        const images = JSON.parse(article["images"]);
        const image_src = images["image_intro"]
          ? Url + images["image_intro"]
          : "./assets/images/article-no-image.png";
        return (
          <div className="article-outter" key={index}>
            <IonButton
              class={
                bookmarksArticles.includes(article["id"])
                  ? "bookmark-toggle bookmark-active"
                  : "bookmark-toggle"
              }
              slot="icon-only"
              onClick={() => {
                bookmarkToggle(article["id"], "articles");
              }}
            >
              <IonIcon icon={starOutline} size="large"></IonIcon>
            </IonButton>
            <IonItem routerLink={`/page/articles/` + article["id"]}>
              <div className="ion-card">
                <img src={image_src} alt={article["alias"]} />
                <div className="ion-card-header">
                  <div className="ion-card-subtitle ion-card-date">
                    Added on <Formatdate date={article["created"]} />
                  </div>
                  <div className="ion-card-title">{article["title"]}</div>
                </div>
                <div className="ion-card-content">
                  <div
                    className="slider-item-subtitle"
                    dangerouslySetInnerHTML={{
                      __html: article["introtext"]
                        ? Truncate(article["introtext"], 100)
                        : "",
                    }}
                  />
                  <span className="text-white">Read More</span>
                </div>
              </div>
            </IonItem>
          </div>
        );
      })
    ) : (
      <>
        <div className="center-container">No Articles Bookmarked.</div>
      </>
    );
  };

  const News = ({ data }) => {
    return Object.keys(data).length > 0 ? (
      data.map((article, index) => {
        const images = JSON.parse(article["images"]);
        const image_src = images["image_intro"]
          ? Url + images["image_intro"]
          : "./assets/images/article-no-image.png";
        return (
          <div className="article-outter" key={index}>
            <IonButton
              class={
                bookmarksNews.includes(article["id"])
                  ? "bookmark-toggle bookmark-active"
                  : "bookmark-toggle"
              }
              slot="icon-only"
              onClick={() => {
                bookmarkToggle(article["id"], "news");
              }}
            >
              <IonIcon icon={starOutline} size="large"></IonIcon>
            </IonButton>
            <IonItem key={index} routerLink={`/page/news/` + article["id"]}>
              <div className="ion-card">
                <img src={image_src} alt={article["alias"]} />
                <div className="ion-card-header">
                  <div className="ion-card-subtitle ion-card-date">
                    Added on <Formatdate date={article["created"]} />
                  </div>
                  <div className="ion-card-title">{article["title"]}</div>
                </div>
                <div className="ion-card-content">
                  <div
                    className="slider-item-subtitle"
                    dangerouslySetInnerHTML={{
                      __html: article["introtext"]
                        ? Truncate(article["introtext"], 100)
                        : "",
                    }}
                  />
                  <span className="text-white">Read More</span>
                </div>
              </div>
            </IonItem>
          </div>
        );
      })
    ) : (
      <>
        <div className="center-container">No News Bookmarked.</div>
      </>
    );
  };

  const Videos = ({ data }) => {
    return Object.keys(data).length > 0 ? (
      data.map((video, index) => {
        if (video) {
          const image_src =
            "https://i3.ytimg.com/vi/" +
            (video["youtubelink"] ? video["youtubelink"] : "") +
            "/hqdefault.jpg";
          return (
            <div className="video-outter" key={index}>
              <IonButton
                class={
                  bookmarksVideos.includes(video["id"])
                    ? "bookmark-toggle bookmark-active"
                    : "bookmark-toggle"
                }
                slot="icon-only"
                onClick={() => {
                  bookmarkToggle(video["id"], "videos");
                }}
              >
                <IonIcon icon={starOutline} size="large"></IonIcon>
              </IonButton>
              <IonItem
                onClick={() => {
                  playVideo(video["youtubelink"]);
                }}
              >
                <div className="ion-card video-page-item">
                  <IonIcon icon={playCircle} />
                  <img src={image_src} alt={video["alias"]} />
                  <div className="ion-card-header">
                    <div className="ion-card-subtitle ion-card-date">
                      Added on <Formatdate date={video["created"]} />
                    </div>
                    <div className="ion-card-title">{video["title"]}</div>
                  </div>
                  <div className="ion-card-content">
                    <div
                      className="slider-item-subtitle"
                      dangerouslySetInnerHTML={{
                        __html: video["description"]
                          ? Truncate(video["description"], 100)
                          : "",
                      }}
                    />
                  </div>
                </div>
              </IonItem>
            </div>
          );
        }
      })
    ) : (
      <>
        <div className="center-container">No Videos Bookmarked</div>
      </>
    );
  };

  const setActiveTab = (id) => {
    setTab(id);
  };

  const doRefresh = (event) => {
    authGlobalContext.setUserAuthRefresh(true);
    setDataloaded(false);
    getSession(event);
  };

  const bookmarkToggle = (articleId, articleCatAlias) => {
    return BookmarksStore(
      articleCatAlias,
      articleId,
      authGlobalContext,
      showLoader,
      hideLoader,
      presentToast,
      history
    );
  };

  const getSession = (event = {}) => {
    showLoader(LoaderOptions);
    const getLocalstorage = async () => {
      if (await authGlobalContext.db) {
        const UserSession = await authGlobalContext.db.get("UserSession");
        if (UserSession) {
          hideLoader();
          setItems(UserSession);

          if (UserSession.articles.length > 0) {
            let bookmarkArticlesArray = [];
            UserSession.articles.map((article, index) => {
              bookmarkArticlesArray.push(article.id);
            });
            setBookmarksArticles(bookmarkArticlesArray);
          }

          if (UserSession.news.length > 0) {
            let bookmarkNewsArray = [];
            UserSession.news.map((news, index) => {
              bookmarkNewsArray.push(news.id);
            });
            setBookmarksNews(bookmarkNewsArray);
          }

          if (UserSession.videos.length > 0) {
            let bookmarkVideosArray = [];
            UserSession.videos.map((video, index) => {
              bookmarkVideosArray.push(video.id);
            });
            setBookmarksVideos(bookmarkVideosArray);
          }

          setDataloaded(true);
        } else {
          history.push("/page/login");
        }
      }
      if (Object.keys(event).length > 0) {
        event.detail.complete();
      }
      hideLoader();
    };
    getLocalstorage();
  };

  const clearSession = () => {
    setBookmarksArticles([]);
    setBookmarksNews([]);
  };

  useEffect(() => {
    hideLoader();
    clearSession();
    if (!authGlobalContext.userAuthRefresh) {
      getSession();
    }
  }, [authGlobalContext.userAuthSession]);

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <div className="IonTitleWrapper">
            <IonIcon icon={bookmark}></IonIcon>
            <IonTitle>Bookmarks</IonTitle>
          </div>
        </IonToolbar>
        <IonSegment
          scrollable
          value={tab}
          onIonChange={(e) => setActiveTab(e.detail.value)}
        >
          <IonSegmentButton value="articles">
            <IonLabel>Articles</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="news">
            <IonLabel>News</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="videos">
            <IonLabel>Videos</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonHeader>
      <IonContent>
        {dataloaded && (
          <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
        )}
        {dataloaded && tab === "articles" && (
          <Articles data={items["articles"]} />
        )}
        {dataloaded && tab === "news" && <News data={items["news"]} />}
        {dataloaded && tab === "videos" && <Videos data={items["videos"]} />}
      </IonContent>
    </IonPage>
  );
};

export default Bookmarks;
