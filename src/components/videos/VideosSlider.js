import React, { useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import {
  VideoCardCarousel,
  VideosCardPlaceholder,
  PlayVideo,
} from "./VideoCard";
import { config } from "../../config/config";

const VideosSlider = ({ items = {}, isLoading }) => {
  useEffect(() => {}, [isLoading]);

  return !isLoading ? (
    <OwlCarousel key={0} className="owl-theme" {...config.videocarousel}>
      {Object.keys(items).length > 0 ? (
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
      )}
    </OwlCarousel>
  ) : (
    <OwlCarousel {...config.videocarousel} key={1}>
      <VideosCardPlaceholder />
      <VideosCardPlaceholder />
    </OwlCarousel>
  );
};

export default VideosSlider;
