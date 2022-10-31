import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import VideosList from "../components/videos/VideosList";

import { config } from "../config/config";
import axios from "../config/axios";

const Videos = (props) => {
  const [videoCategoriesItems, setVideoCategoriesItems] = useState({});
  const [videoCategoriesActiveId, setVideoCategoriesActiveId] = useState(0);
  const [videoCategoriesLoading, setVideoCategoriesLoading] = useState(true);

  const [videosItems, setVideosItems] = useState({});
  const [videosLoading, setVideosLoading] = useState(true);

  const GetCategoryItems = (event = {}, categoryId) => {
    setTimeout(async () => {
      await axios
        .get(null, {
          params: {
            type: config.videos.type,
            featured: categoryId === 0 ? true : false,
            catid: categoryId ? categoryId : videoCategoriesActiveId,
          },
        })
        .then((response) => {
          // messages(response);
          setVideosItems(response.data.data);
          setVideosLoading(false);
        });
    }, config.timeOutDelay);
  };

  const GetCategories = (event = {}) => {
    setTimeout(async () => {
      await axios
        .get(null, {
          params: {
            type: "videosCategories",
          },
        })
        .then((response) => {
          // messages(response);
          setVideoCategoriesItems(response.data.data);
          setVideoCategoriesLoading(false);
        });
    }, config.timeOutDelay);
  };

  const setCategoryId = (categoryId) => {
    setVideosLoading(true);
    setVideoCategoriesActiveId(categoryId);
    GetCategoryItems({}, categoryId);
  };

  const doRefresh = (event) => {
    GetCategories(event);
    GetCategoryItems(event);
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
    <PageLayout
      title={config.videos.name}
      tabShow={true}
      tabItems={videoCategoriesItems}
      tabDefaultTitle={"Featured"}
      tabDefaultTitleValue={0}
      tabActiveValue={videoCategoriesActiveId}
      tabIsLoading={videoCategoriesLoading}
      tabOnChange={(categoryId) => setCategoryId(categoryId)}
    >
      <VideosList items={videosItems} isLoading={videosLoading} />
    </PageLayout>
  );
};
export default Videos;
