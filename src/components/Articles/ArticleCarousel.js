import OwlCarousel from 'react-owl-carousel';
import { CAROUSEL_OPTIONS } from '../../config/config';

import ArticleCard from './ArticleCard';

const ArticleCarousel = ({ items }) => {
	const { data } = items;

	return (
		<OwlCarousel className="owl-theme" {...CAROUSEL_OPTIONS}>
			{data.length > 0 ? data.map((article) => <ArticleCard key={article.id} data={article} />) : <>No articles to display</>}
		</OwlCarousel>
	);
};
export default ArticleCarousel;
