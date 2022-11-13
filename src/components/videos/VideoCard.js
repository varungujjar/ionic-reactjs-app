import React from "react";
import { playCircle } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import Card from "../Card";
import { Fancybox } from "@fancyapps/ui";

export const PlayVideo = (youTubeId) => {
  const videoSrc = `https://www.youtube.com/watch?v=${youTubeId}&autoplay=1&color=white&modestbranding=1`;
  Fancybox.show([
    {
      src: videoSrc,
      type: "youtube",
    },
  ]);
};

export const VideoCardCarousel = ({ videoTitle, videoAlias, youTubeId, videoDuration, onClick }) => {
  const videoImage = `https://i3.ytimg.com/vi/${youTubeId}/hqdefault.jpg`;

  return (
    <Card
      onClickData={youTubeId}
      onClick={(youTubeId) => {
        onClick(youTubeId);
      }}
    >
      <img src={videoImage} alt={videoAlias} />
      <div className="card-body">
        <h5 className="card-title">{videoTitle}</h5>
        <p className="card-text">{videoDuration}</p>
        <p className="card-text">Some quick example text to build on the card title and make up the</p>
      </div>
    </Card>
  );
};

export const VideosCardPlaceholder = () => {
  return (
    <Card>
      <img src={"./assets/images/article-no-image.png"} className="card-img-top placeholder" />
      <div className="card-body">
        <h5 className="card-title placeholder-glow">
          <span className="placeholder col-6"></span>
        </h5>
        <p className="card-text placeholder-glow">
          <span className="placeholder col-4"></span>
        </p>
        <p className="card-text placeholder-glow">
          <span className="placeholder col-7"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-6"></span>
        </p>
      </div>
    </Card>
  );
};
