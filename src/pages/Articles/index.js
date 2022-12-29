import { useEffect, useState } from 'react';
import { API } from '../../config/config';
import { useDispatch } from 'react-redux';
import { showNotificationAction } from '../../redux/actions';
import serviceApi from '../../config/axios';

import Layout from '../../components/Layout';
import ArticleCardPlaceholder from '../../components/Articles/ArticleCardPlaceholder';
import ArticleCard from '../../components/Articles/ArticleCard';

const Articles = ({ id, title }) => {
	// const location = useLocation();
	// const pathname = location.pathname;
	// const lastSegement = pathname.substring(pathname.lastIndexOf('/') + 1);
	const categoryId = id;
	const categoryName = title;

	const [items, setItems] = useState({ data: {}, loading: true });
	const [refreshToggle, setRefreshToggle] = useState(false);
	const reduxDispatch = useDispatch();

	const doRefresh = (event) => {
		setItems((prev) => ({ ...prev, loading: true }));
		setRefreshToggle(!refreshToggle);
		event.detail.complete();
	};

	useEffect(() => {
		const fetchItems = async () => {
			await serviceApi
				.get(null, {
					params: {
						type: API.articles.type,
						catid: categoryId,
					},
				})
				.then((response) => {
					reduxDispatch(showNotificationAction(response.data));
					setItems((prev) => ({ ...prev, data: response.data.data, loading: false }));
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
		setTimeout(async () => {
			fetchItems();
		}, API.timeOutDelay);
	}, [categoryId, reduxDispatch, refreshToggle]);

	return (
		<Layout title={categoryName} onPageRefresh={doRefresh} enablePageRefresh={true}>
			{items.loading ? (
				<>
					<ArticleCardPlaceholder />
					<ArticleCardPlaceholder />
				</>
			) : items.data.length > 0 ? (
				items.data.map((article) => <ArticleCard key={article.id} data={article} />)
			) : (
				<>No articles to display</>
			)}
		</Layout>
	);
};
export default Articles;
