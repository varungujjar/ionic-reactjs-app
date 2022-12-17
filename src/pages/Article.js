import { useEffect, useState, useMemo, useContext } from 'react';
import { documentText } from 'ionicons/icons';
import PageLayout from '../components/PageLayout';
import { ArticlePagePlaceHolder, ArticlePage } from '../components/articles/ArticlePage';
import api from '../config/axios';
import { config } from '../config/config';
import { setToast } from '../components/Toast';
import GlobalContext from '../helpers/Context';

import './Article.css';

const Article = (props) => {
	const articleId = props.match.params.id;
	const [articlesCatName, setArticlesCatName] = useState(null);
	const [articlesItems, setArticlesItems] = useState({});
	const [articlesLoading, setArticlesLoading] = useState(true);

	const context = useContext(GlobalContext);

	// useMemo(() => {
	//   setLoading(true);
	// }, [response, articleId]);

	const GetArticlesItems = async () => {
		await api
			.get(null, {
				params: {
					type: config.articles.type,
					id: articleId,
				},
			})
			.then((response) => {
				setToast(context, response.data);
				setArticlesItems(response.data.data);
				setArticlesCatName(
					response.data.data.catid === config.news.catid ? config.news.name : config.articles.name
				);
				setArticlesLoading(false);
			})
			.catch((error) => {
				setToast(context, {
					message: error.toJSON().message,
					type: 'danger',
				});
			});
	};

	useEffect(() => {
		GetArticlesItems();
		return () => {
			setArticlesLoading(true);
		};
	}, [articleId]);

	return (
		<PageLayout title={articlesCatName} icon={documentText}>
			{Object.keys(articlesItems).length > 0 && !articlesLoading ? (
				<ArticlePage item={articlesItems} />
			) : (
				<ArticlePagePlaceHolder />
			)}
		</PageLayout>
	);
};

export default Article;
