import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { config } from "../../config/config";
import {
  VideoCardCarousel,
  VideosCardPlaceholder,
  PlayVideo,
} from "./VideoCard";

const VideosList = ({ items = {}, isLoading }) => {
  let history = useHistory();
  useEffect(() => {}, [isLoading]);

  return !isLoading ? (
    Object.keys(items).length > 0 ? (
      items.map((video) => (
        <VideoCardCarousel
          key={video.id}
          videoTitle={video.title}
          videoAlias={video.alias}
          youTubeId={video.youtubelink}
          videoDuration={video.duration}
          onClick={(youTubeId) => PlayVideo(youTubeId)}
        />
      ))
    ) : (
      <>No videos to display</>
    )
  ) : (
    <>
      <VideosCardPlaceholder />
      <VideosCardPlaceholder />
    </>
  );
};
export default VideosList;
