import { useEffect, useState } from 'react';
import { config } from '../../config/config';
import { useDispatch } from 'react-redux';
import api from '../../config/axios';

import { showNotificationAction } from '../../redux/actions';

import PageLayout from '../../components/PageLayout';
import ArticlesList from './ArticlesList';

const Articles = ({ catRef }) => {
	const [articlesItems, setArticlesItems] = useState({ data: {}, loading: true });
	const [refreshToggle, setRefreshToggle] = useState(false);

	const reduxDispatch = useDispatch();

	const doRefresh = (event) => {
		setArticlesItems((prev) => ({ ...prev, loading: true }));
		setRefreshToggle(!refreshToggle);
		event.detail.complete();
	};

	useEffect(() => {
		const GetArticlesItems = () => {
			setTimeout(async () => {
				await api
					.get(null, {
						params: {
							type: config.articles.type,
							catid: config[catRef].catid,
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
			}, config.timeOutDelay);
		};

		GetArticlesItems();
	}, [catRef, refreshToggle, reduxDispatch]);

	return (
		<PageLayout title={config[catRef].name} onPageRefresh={doRefresh} showPageRefresh={true}>
			<ArticlesList data={articlesItems} catRef={catRef} />
		</PageLayout>
	);
};
export default Articles;
