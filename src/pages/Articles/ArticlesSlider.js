import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { config } from '../../config/config';

import Carousel from '../../components/Carousel';
import { ArticleCard, ArticlesCardPlaceholder } from './ArticleCard';

const ArticlesSlider = ({ data }) => {
	let history = useHistory();
	useEffect(() => {}, [data.loading]);

	return !data.loading ? (
		<Carousel key={0} config={config.videocarousel}>
			{Object.keys(data.data).length > 0 ? (
				data.data.map((article) => (
					<ArticleCard
						key={article.id}
						article={article}
						onClick={(articleId) => {
							history.push(`${config.articles.path}/${articleId}`);
						}}
					/>
				))
			) : (
				<>No articles to display</>
			)}
		</Carousel>
	) : (
		<Carousel config={config.videocarousel} key={1}>
			<ArticlesCardPlaceholder />
			<ArticlesCardPlaceholder />
		</Carousel>
	);
};
export default ArticlesSlider;
