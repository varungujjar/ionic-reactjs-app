import OwlCarousel from 'react-owl-carousel';
import ArticleCardPlaceholder from './ArticleCardPlaceholder';
import { CAROUSEL_OPTIONS } from '../../config/config';

const ArticleCarouselPlaceholder = () => {
	return (
		<OwlCarousel className="owl-theme" {...CAROUSEL_OPTIONS}>
			<ArticleCardPlaceholder />
			<ArticleCardPlaceholder />
		</OwlCarousel>
	);
};

export default ArticleCarouselPlaceholder;
