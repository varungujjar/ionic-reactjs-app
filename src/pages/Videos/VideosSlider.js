import { useEffect } from 'react';
import { config } from '../../config/config';

import Carousel from '../../components/Carousel';
import { VideoCardCarousel, VideosCardPlaceholder, PlayVideo } from './VideoCard';

const VideosSlider = ({ data }) => {
	useEffect(() => {}, [data.loading]);

	return !data.loading ? (
		<Carousel key={0} className="owl-theme" config={config.videocarousel}>
			{Object.keys(data.data).length > 0 ? (
				data.data.map((video) => (
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
		</Carousel>
	) : (
		<Carousel config={config.videocarousel} key={1}>
			<VideosCardPlaceholder />
			<VideosCardPlaceholder />
		</Carousel>
	);
};

export default VideosSlider;
