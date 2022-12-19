import { useEffect, useState } from 'react';
import { documentText } from 'ionicons/icons';
import PageLayout from '../../components/PageLayout';
import { StaticPagePlaceHolder, StaticPage } from './StaticPage';
import api from '../../config/axios';
import { config } from '../../config/config';
import { setToast } from '../../components/Toast';
import { useDispatch } from 'react-redux';

const Static = ({ id }) => {
	const [articlesItems, setArticlesItems] = useState({ data: {}, loading: true });

	const reduxDispatch = useDispatch();

	useEffect(() => {
		const GetArticlesItems = () => {
			setTimeout(async () => {
				await api
					.get(null, {
						params: {
							type: config.articles.type,
							id: id,
						},
					})
					.then((response) => {
						setToast(reduxDispatch, response.data);
						setArticlesItems((prev) => ({ ...prev, data: response.data.data, loading: false }));
					})
					.catch((error) => {
						setToast(reduxDispatch, {
							message: error.toJSON().message,
							type: 'danger',
						});
					});
			}, config.timeOutDelay);
		};

		GetArticlesItems();
	}, [id, reduxDispatch]);

	return (
		<PageLayout title={articlesItems.data.title ? articlesItems.data.title : null} icon={documentText}>
			{Object.keys(articlesItems.data).length > 0 && !articlesItems.loading ? <StaticPage data={articlesItems} /> : <StaticPagePlaceHolder />}
		</PageLayout>
	);
};

export default Static;
