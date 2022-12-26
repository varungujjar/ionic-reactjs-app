import { useEffect } from 'react';
import { CAROUSEL_OPTIONS } from '../../config/config';

import Carousel from '../Carousel';
import ArticleCard from './ArticleCard';
import ArticleCardPlaceholder from './ArticleCardPlaceholder';

const ArticleCarousel = ({ data }) => {
	useEffect(() => {}, [data.loading]);

	return (
		<Carousel config={CAROUSEL_OPTIONS}>
			{!data.loading ? (
				Object.keys(data.data).length > 0 ? (
					data.data.map((article) => <ArticleCard key={article.id} data={article} />)
				) : (
					<>No articles to display</>
				)
			) : (
				<>
					<ArticleCardPlaceholder />
					<ArticleCardPlaceholder />
				</>
			)}
		</Carousel>
	);
};
export default ArticleCarousel;
