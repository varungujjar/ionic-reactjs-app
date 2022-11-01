import { useEffect, useState, useContext } from "react";
import PageLayout from "../components/PageLayout";
import VideosList from "../components/videos/VideosList";
import { setToast } from "../components/Toast";
import GlobalContext from "../helpers/Context";
import { config } from "../config/config";
import api from "../config/axios";

const Videos = () => {
  const [videoCategoriesItems, setVideoCategoriesItems] = useState({});
  const [videoCategoriesActiveId, setVideoCategoriesActiveId] = useState(0);
  const [videoCategoriesLoading, setVideoCategoriesLoading] = useState(true);

  const [videosItems, setVideosItems] = useState({});
  const [videosLoading, setVideosLoading] = useState(true);

  const context = useContext(GlobalContext);

  const GetCategoryItems = (categoryId) => {
    setTimeout(async () => {
      await api
        .get(null, {
          params: {
            type: config.videos.type,
            featured: categoryId === 0 ? true : false,
            catid: categoryId ? categoryId : videoCategoriesActiveId,
          },
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

  const GetCategories = () => {
    setTimeout(async () => {
      await api
        .get(null, {
          params: {
            type: "videosCategories",
          },
        })
        .then((response) => {
          setToast(context, response.data);
          setVideoCategoriesItems(response.data.data);
          setVideoCategoriesLoading(false);
        })
        .catch((error) => {
          setToast(context, {
            message: error.toJSON().message,
            type: "danger",
          });
        });
    }, config.timeOutDelay);
  };

  const setCategoryId = (categoryId) => {
    setVideosLoading(true);
    setVideoCategoriesActiveId(categoryId);
    GetCategoryItems({}, categoryId);
  };

  const doRefresh = (event) => {
    setVideosLoading(true);
    setVideoCategoriesLoading(true);
    GetCategories();
    GetCategoryItems();
    event.detail.complete();
  };

  useEffect(() => {
    if (videoCategoriesLoading) {
      GetCategories();
    }

    if (videosLoading) {
      GetCategoryItems({}, videoCategoriesActiveId);
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
export default Videos;
