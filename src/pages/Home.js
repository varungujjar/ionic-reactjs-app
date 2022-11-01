import { useEffect, useState, useContext } from "react";
import { config } from "../config/config";
import api from "../config/axios";

import PageLayout from "../components/PageLayout";
import { PageSection } from "../components/PageSection";

import VideosSlider from "../components/videos/VideosSlider";
import ArticlesSlider from "../components/articles/ArticlesSlider";
import UsersSlider from "../components/users/UsersSlider";
import { setToast } from "../components/Toast";
import GlobalContext from "../helpers/Context";

const Home = () => {
  const [videosItems, setVideosItems] = useState({});
  const [videosLoading, setVideosLoading] = useState(true);

  const [articlesItems, setArticlesItems] = useState({});
  const [articlesLoading, setArticlesLoading] = useState(true);

  const [newsItems, setNewsItems] = useState({});
  const [newsLoading, setNewsLoading] = useState(true);

  const [usersItems, setUsersItems] = useState({});
  const [usersLoading, setUsersLoading] = useState(true);

  const context = useContext(GlobalContext);

  const GetVideoItems = () => {
    setTimeout(async () => {
      await api
        .get(null, {
          params: { type: config.videos.type, featured: true },
        })
        .then((response) => {
          setToast(context, response.data);
          setVideosItems(response.data.data);
          setVideosLoading(false);
        })
        .catch((error) => {
          setToast(context, {
            message: error.toJSON().message,
            type: "danger",
          });
        });
    }, config.timeOutDelay);
  };

  const GetArticlesItems = () => {
    setTimeout(async () => {
      await api
        .get(null, {
          params: {
            type: config.articles.type,
            featured: true,
            catid: config.articles.catid,
          },
        })
        .then((response) => {
          setToast(context, response.data);
          setArticlesItems(response.data.data);
          setArticlesLoading(false);
        })
        .catch((error) => {
          setToast(context, {
            message: error.toJSON().message,
            type: "danger",
          });
        });
    }, config.timeOutDelay);
  };

  const GetNewsItems = () => {
    setTimeout(async () => {
      await api
        .get(null, {
          params: {
            type: config.news.type,
            featured: true,
            catid: config.news.catid,
          },
        })
        .then((response) => {
          setToast(context, response.data);
          setNewsItems(response.data.data);
          setNewsLoading(false);
        })
        .catch((error) => {
          setToast(context, {
            message: error.toJSON().message,
            type: "danger",
          });
        });
    }, config.timeOutDelay);
  };

  const GetUsersItems = async () => {
    setTimeout(async () => {
      await api
        .get(null, {
          params: {
            type: config.users.type,
          },
        })
        .then((response) => {
          setToast(context, response.data);
          setUsersItems(response.data.data);
          setUsersLoading(false);
        })
        .catch((error) => {
          setToast(context, {
            message: error.toJSON().message,
            type: "danger",
          });
        });
    }, config.timeOutDelay);
  };

  const doRefresh = (event) => {
    setVideosLoading(true);
    setArticlesLoading(true);
    setNewsLoading(true);
    setUsersLoading(true);
    GetVideoItems();
    GetArticlesItems();
    GetNewsItems();
    GetUsersItems();
    event.detail.complete();
  };

  useEffect(() => {
    if (videosLoading) {
      GetVideoItems();
    }
    if (articlesLoading) {
      GetArticlesItems();
    }
    if (newsLoading) {
      GetNewsItems();
    }
    if (usersLoading) {
      GetUsersItems();
    }
  }, []);

  return (
    <PageLayout
      title={config.home.name}
      onPageRefresh={doRefresh}
      showPageRefresh={true}
    >
      <PageSection title={config.videos.name} link={config.videos.path} />
      <VideosSlider items={videosItems} isLoading={videosLoading} />

      <PageSection title={config.users.name} />
      <UsersSlider items={usersItems} isLoading={usersLoading} />

      <PageSection title={config.articles.name} link={config.articles.path} />
      <ArticlesSlider items={articlesItems} isLoading={articlesLoading} />

      <PageSection title={config.news.name} link={config.news.path} />
      <ArticlesSlider items={newsItems} isLoading={newsLoading} />
    </PageLayout>
  );
};

export default Home;
