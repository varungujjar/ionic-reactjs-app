import { useEffect, useState, useContext } from 'react';
import { documentText } from 'ionicons/icons';
import PageLayout from '../../components/PageLayout';
import { StaticPagePlaceHolder, StaticPage } from './StaticPage';
import api from '../../config/axios';
import { config } from '../../config/config';
import { setToast } from '../../components/Toast';
import GlobalContext from '../../helpers/Context';

const Static = ({ id }) => {
	const [articlesItems, setArticlesItems] = useState({});
	const [articlesLoading, setArticlesLoading] = useState(true);

	const context = useContext(GlobalContext);

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
					setToast(context, response.data);
					setArticlesItems(response.data.data);
					setArticlesLoading(false);
				})
				.catch((error) => {
					setToast(context, {
						message: error.toJSON().message,
						type: 'danger',
					});
				});
		}, config.timeOutDelay);
	};

	useEffect(() => {
		GetArticlesItems();
		return () => {
			setArticlesLoading(true);
		};
	}, [id]);

	return (
		<PageLayout title={articlesItems.title ? articlesItems.title : null} icon={documentText}>
			{Object.keys(articlesItems).length > 0 && !articlesLoading ? <StaticPage item={articlesItems} /> : <StaticPagePlaceHolder />}
		</PageLayout>
	);
};

export default Static;
