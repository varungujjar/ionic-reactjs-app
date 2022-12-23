import { useEffect, useState } from 'react';
import { documentText } from 'ionicons/icons';
import PageLayout from '../../components/PageLayout';
import { ArticlePagePlaceHolder, ArticlePage } from './ArticlePage';

import { config } from '../../config/config';
import api from '../../config/axios';

import { showNotificationAction } from '../../redux/actions';
import { useDispatch } from 'react-redux';

import './Article.css';

const Article = (props) => {
	const articleId = props.match.params.id;
	const [articlesItems, setArticlesItems] = useState({ data: {}, loading: true, category: '' });

	const reduxDispatch = useDispatch();

	useEffect(() => {
		const GetArticlesItems = async () => {
			await api
				.get(null, {
					params: {
						type: config.articles.type,
						id: articleId,
					},
				})
				.then((response) => {
					reduxDispatch(showNotificationAction(response.data));
					setArticlesItems((prev) => ({
						...prev,
						data: response.data.data,
						loading: false,
						category: response.data.data.catid === config.news.catid ? config.news.name : config.articles.name,
					}));
				})
				.catch((error) => {
					reduxDispatch(
						showNotificationAction({
							message: error.toJSON().message,
							type: 'danger',
						})
					);
				});
		};
		GetArticlesItems();
	}, [articleId, reduxDispatch]);

	return (
		<PageLayout title={articlesItems.category} icon={documentText}>
			{Object.keys(articlesItems.data).length > 0 && !articlesItems.loading ? <ArticlePage item={articlesItems.data} /> : <ArticlePagePlaceHolder />}
		</PageLayout>
	);
};

export default Article;
