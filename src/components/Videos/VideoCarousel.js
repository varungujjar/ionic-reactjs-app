import { CAROUSEL_OPTIONS } from '../../config/config';
import OwlCarousel from 'react-owl-carousel';

import VideoCard from './VideoCard';

const VideoCarousel = ({ items }) => {
	const { data } = items;

	return (
		<OwlCarousel className="owl-theme" {...CAROUSEL_OPTIONS}>
			{data.length > 0 ? data.map((video) => <VideoCard key={video.id} data={video} />) : <>No videos to display</>}
		</OwlCarousel>
	);
};

export default VideoCarousel;
