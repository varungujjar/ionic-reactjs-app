import { useEffect } from 'react';
import { CAROUSEL_OPTIONS } from '../../config/config';

import Carousel from '../Carousel';
import VideoCard from './VideoCard';
import VideoCardPlaceholder from './VideoCardPlaceholder';

const VideoCarousel = ({ data }) => {
	useEffect(() => {}, [data.loading]);

	return (
		<Carousel className="owl-theme" config={CAROUSEL_OPTIONS}>
			{!data.loading ? (
				Object.keys(data.data).length > 0 ? (
					data.data.map((video) => <VideoCard key={video.id} data={video} />)
				) : (
					<>No videos to display</>
				)
			) : (
				<>
					<VideoCardPlaceholder />
					<VideoCardPlaceholder />
				</>
			)}
		</Carousel>
	);
};

export default VideoCarousel;
