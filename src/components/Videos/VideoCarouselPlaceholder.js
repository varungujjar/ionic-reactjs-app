import OwlCarousel from 'react-owl-carousel';
import VideoCardPlaceholder from './VideoCardPlaceholder';
import { CAROUSEL_OPTIONS } from '../../config/config';

const VideoCarouselPlaceholder = () => {
	return (
		<OwlCarousel className="owl-theme" {...CAROUSEL_OPTIONS}>
			<VideoCardPlaceholder />
			<VideoCardPlaceholder />
		</OwlCarousel>
	);
};

export default VideoCarouselPlaceholder;
