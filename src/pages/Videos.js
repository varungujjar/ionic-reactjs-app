import { useEffect, useState, useContext } from "react";
import { config } from "../config/config";
import { setToast } from "../components/Toast";
import { useDispatch } from "react-redux";
import api from "../config/axios";

import PageLayout from "../components/PageLayout";
import VideosList from "../components/videos/VideosList";

const memo = (callback) => {
  const cache = new Map();
  return (...args) => {
    const selector = JSON.stringify(args);
    if (cache.has(selector)) return cache.get(selector);
    const value = callback(...args);
    cache.set(selector, value);
    return value;
  };
};

const memoizedAxiosGet = memo(api.get);

const Videos = () => {
  const [videoCategoriesItems, setVideoCategoriesItems] = useState({});
  const [videoCategoriesActiveId, setVideoCategoriesActiveId] = useState(0);
  const [videoCategoriesLoading, setVideoCategoriesLoading] = useState(true);

  const [videosItems, setVideosItems] = useState({});
  const [videosLoading, setVideosLoading] = useState(true);

  const reduxDispatch = useDispatch();

  const GetCategoryItems = (categoryId) => {
    setTimeout(async () => {
      await memoizedAxiosGet(null, {
        params: {
          type: config.videos.type,
          featured: categoryId === 0 ? true : false,
          catid: categoryId ? categoryId : videoCategoriesActiveId,
        },
      })
        .then((response) => {
          setToast(reduxDispatch, response.data);
          setVideosItems(response.data.data);
          setVideosLoading(false);
        })
        .catch((error) => {
          setToast(reduxDispatch, {
            message: error.toJSON().message,
            type: "danger",
          });
        });
    }, config.timeOutDelay);
  };

  const GetCategories = () => {
    setTimeout(async () => {
      await api
        .get(null, {
          params: {
            type: "videosCategories",
          },
        })
        .then((response) => {
          setToast(reduxDispatch, response.data);
          setVideoCategoriesItems(response.data.data);
          setVideoCategoriesLoading(false);
        })
        .catch((error) => {
          setToast(reduxDispatch, {
            message: error.toJSON().message,
            type: "danger",
          });
        });
    }, config.timeOutDelay);
  };

  const setCategoryId = (categoryId) => {
    setVideosLoading(true);
    setVideoCategoriesActiveId(categoryId);
    GetCategoryItems(categoryId);
  };

  const doRefresh = (event) => {
    setVideosLoading(true);
    setVideoCategoriesLoading(true);
    GetCategories();
    GetCategoryItems(videoCategoriesActiveId);
    event.detail.complete();
  };

  useEffect(() => {
    if (videoCategoriesLoading) {
      GetCategories();
    }

    if (videosLoading) {
      GetCategoryItems(videoCategoriesActiveId);
    }
  }, []);

  return (
    <>
      <PageLayout
        title={config.videos.name}
        tabShow={true}
        tabItems={videoCategoriesItems}
        tabDefaultTitle={"Featured"}
        tabDefaultTitleValue={0}
        tabActiveValue={videoCategoriesActiveId}
        tabIsLoading={videoCategoriesLoading}
        tabOnChange={(categoryId) => setCategoryId(categoryId)}
        showPageRefresh={true}
        onPageRefresh={doRefresh}
      >
        <VideosList items={videosItems} isLoading={videosLoading} />
      </PageLayout>
    </>
  );
};

const mapStatetoProps = (state) => {
  return state;
};

export default Videos;
