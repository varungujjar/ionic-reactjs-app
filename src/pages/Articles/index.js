import { useEffect, useState } from 'react';
import { API } from '../../config/config';
import { useDispatch } from 'react-redux';
import { showNotificationAction } from '../../redux/actions';
import serviceApi from '../../config/axios';

import PageLayout from '../../components/Layout/PageLayout';
import ArticleCardPlaceholder from '../../components/Articles/ArticleCardPlaceholder';
import ArticleCard from '../../components/Articles/ArticleCard';

const Articles = ({ id, title }) => {
	// const location = useLocation();
	// const pathname = location.pathname;
	// const lastSegement = pathname.substring(pathname.lastIndexOf('/') + 1);
	const categoryId = id;
	const categoryName = title;

	const [articlesItems, setArticlesItems] = useState({ data: {}, loading: true });

	const reduxDispatch = useDispatch();

	const doRefresh = (event) => {
		setArticlesItems((prev) => ({ ...prev, loading: true }));
		event.detail.complete();
	};

	useEffect(() => {
		const fetchData = () => {
			setTimeout(async () => {
				await serviceApi
					.get(null, {
						params: {
							type: API.articles.type,
							catid: categoryId,
						},
					})
					.then((response) => {
						reduxDispatch(showNotificationAction(response.data));
						setArticlesItems((prev) => ({ ...prev, data: response.data.data, loading: false }));
					})
					.catch((error) => {
						reduxDispatch(
							showNotificationAction({
								message: error.toJSON().message,
								type: 'danger',
							})
						);
					});
			}, API.timeOutDelay);
		};

		fetchData();
	}, [categoryId, reduxDispatch, articlesItems.loading]);

	return (
		<PageLayout title={categoryName} onPageRefresh={doRefresh} showPageRefresh={true}>
			{!articlesItems.loading ? (
				Object.keys(articlesItems.data).length > 0 ? (
					articlesItems.data.map((article) => <ArticleCard key={article.id} data={article} />)
				) : (
					<>No articles to display</>
				)
			) : (
				<>
					<ArticleCardPlaceholder />
					<ArticleCardPlaceholder />
				</>
			)}
		</PageLayout>
	);
};
export default Articles;
