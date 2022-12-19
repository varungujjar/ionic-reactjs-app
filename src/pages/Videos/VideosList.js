import { useEffect } from 'react';
import { VideoCardCarousel, VideosCardPlaceholder, PlayVideo } from './VideoCard';

const VideosList = ({ items = {}, isLoading }) => {
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
