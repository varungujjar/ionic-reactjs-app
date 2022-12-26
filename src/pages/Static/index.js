import { useEffect, useState } from 'react';
import { documentText } from 'ionicons/icons';
import { API } from '../../config/config';
import { showNotificationAction } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import serviceApi from '../../config/axios';

import PageLayout from '../../components/Layout/PageLayout';
import StaticPlaceholder from './StaticPlaceholder';

const Static = ({ id }) => {
	const [articlesItems, setArticlesItems] = useState({ data: {}, loading: true });
	const reduxDispatch = useDispatch();

	const DisplayItem = ({ data }) => {
		const { title, introtext } = data.data;

		return (
			<>
				<h2 className="mt-3">{title}</h2>

				<div
					className="content-wrapper"
					dangerouslySetInnerHTML={{
						__html: introtext ? introtext : null,
					}}
				/>
			</>
		);
	};

	useEffect(() => {
		const fetchData = () => {
			setTimeout(async () => {
				await serviceApi
					.get(null, {
						params: {
							type: API.articles.type,
							id: id,
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

		return () => {
			setArticlesItems((prev) => ({ ...prev, data: {}, loading: true }));
		};
	}, [id, reduxDispatch]);

	return (
		<PageLayout title={articlesItems.data.title ? articlesItems.data.title : null} icon={documentText}>
			{Object.keys(articlesItems.data).length > 0 && !articlesItems.loading ? <DisplayItem data={articlesItems} /> : <StaticPlaceholder />}
		</PageLayout>
	);
};

export default Static;
