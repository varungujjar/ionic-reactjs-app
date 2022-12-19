import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { config } from '../../config/config';
import { ArticleCard, ArticlesCardPlaceholder } from './ArticleCard';

const ArticlesList = ({ data, catRef = config.articles.type }) => {
	let history = useHistory();
	useEffect(() => {}, [data.loading]);

	return !data.loading ? (
		Object.keys(data.data).length > 0 ? (
			data.data.map((article) => (
				<ArticleCard
					key={article.id}
					article={article}
					onClick={(articleId) => {
						history.push(`/page/${catRef}/${articleId}`);
					}}
				/>
			))
		) : (
			<>No articles to display</>
		)
	) : (
		<>
			<ArticlesCardPlaceholder />
			<ArticlesCardPlaceholder />
		</>
	);
};
export default ArticlesList;
