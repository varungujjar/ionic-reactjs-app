import { useEffect, useState } from "react";
import { config } from "../config/config";
import axios from "../config/axios";

import PageLayout from "../components/PageLayout";
import VideosSlider from "../components/videos/VideosSlider";
import ArticlesSlider from "../components/articles/ArticlesSlider";
import UsersSlider from "../components/users/UsersSlider";

import { PageSection } from "../components/PageSection";

const Home = () => {
  const [message, setMessage] = useState({});

  const [videosItems, setVideosItems] = useState({});
  const [videosLoading, setVideosLoading] = useState(true);

  const [articlesItems, setArticlesItems] = useState({});
  const [articlesLoading, setArticlesLoading] = useState(true);

  const [newsItems, setNewsItems] = useState({});
  const [newsLoading, setNewsLoading] = useState(true);

  const [usersItems, setUsersItems] = useState({});
  const [usersLoading, setUsersLoading] = useState(true);

  const messages = (response) => {
    if (response.data.message) {
      //Noti
    }

    if (response.data.messages) {
      for (const [key, value] of Object.entries(response.data.messages)) {
        value.forEach((message) => {
          //Noti
        });
      }
    }
  };

  const GetVideoItems = () => {
    setTimeout(async () => {
      await axios
        .get(null, {
          params: { type: config.videos.type, featured: true },
        })
        .then((response) => {
          messages(response);
          setVideosItems(response.data.data);
          setVideosLoading(false);
        });
    }, config.timeOutDelay);
  };

  const GetArticlesItems = () => {
    setTimeout(async () => {
      await axios
        .get(null, {
          params: {
            type: config.articles.type,
            featured: true,
            catid: config.articles.catid,
          },
        })
        .then((response) => {
          messages(response);
          setArticlesItems(response.data.data);
          setArticlesLoading(false);
        });
    }, config.timeOutDelay);
  };

  const GetNewsItems = () => {
    setTimeout(async () => {
      await axios
        .get(null, {
          params: {
            type: config.news.type,
            featured: true,
            catid: config.news.catid,
          },
        })
        .then((response) => {
          messages(response);
          setNewsItems(response.data.data);
          setNewsLoading(false);
        });
    }, config.timeOutDelay);
  };

  const GetUsersItems = async () => {
    setTimeout(async () => {
      await axios
        .get(null, {
          params: {
            type: config.users.type,
          },
        })
        .then((response) => {
          messages(response);
          setUsersItems(response.data.data);
          setUsersLoading(false);
        });
    }, config.timeOutDelay);
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
    <PageLayout title={config.home.name}>
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
