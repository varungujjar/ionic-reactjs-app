import { useEffect, useState } from 'react';
import { documentText } from 'ionicons/icons';
import { API } from '../../config/config';
import { showNotificationAction } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import serviceApi from '../../config/axios';

import Layout from '../../components/Layout';
import StaticPlaceholder from './StaticPlaceholder';

const Static = ({ id }) => {
	const [item, setItem] = useState({ data: {}, loading: true });
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
		const fetchItem = () => {
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
						setItem((prev) => ({ ...prev, data: response.data.data, loading: false }));
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

		fetchItem();

		return () => {
			setItem((prev) => ({ ...prev, data: {}, loading: true }));
		};
	}, [id, reduxDispatch]);

	return (
		<Layout title={item.data.title ? item.data.title : null} icon={documentText}>
			{item.loading ? <StaticPlaceholder /> : <DisplayItem data={item} />}
		</Layout>
	);
};

export default Static;
