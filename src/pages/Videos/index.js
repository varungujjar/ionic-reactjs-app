import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showNotificationAction } from '../../redux/actions';
import { API } from '../../config/config';
import serviceApi from '../../config/axios';

import Layout from '../../components/Layout';
import VideoCardPlaceholder from '../../components/Videos/VideoCardPlaceholder';
import VideoCard from '../../components/Videos/VideoCard';

const memo = (callback) => {
	const cache = new Map();
	return (...args) => {
		const selector = JSON.stringify(args);
		if (cache.has(selector)) return cache.get(selector);
		const value = callback(...args);
		cache.set(selector, value);
		return value;
	};
};

const memoizedAxiosGet = memo(serviceApi.get);

const Videos = () => {
	const [items, setItems] = useState({ data: {}, loading: true });
	const [itemCategories, setItemCategories] = useState({ activeId: 0, data: {}, loading: true });

	const reduxDispatch = useDispatch();

	const tabOnChangeHandler = (id) => {
		setItems((prev) => ({ ...prev, loading: true }));
		setItemCategories((prev) => ({ ...prev, activeId: id }));
	};

	const doRefresh = (event) => {
		setItems((prev) => ({ ...prev, loading: true }));
		setItemCategories((prev) => ({ ...prev, loading: true }));
		event.detail.complete();
	};

	useEffect(() => {
		const fetchItems = (categoryId) => {
			setTimeout(async () => {
				await memoizedAxiosGet(null, {
					params: {
						type: API.videos.type,
						featured: categoryId === 0 ? true : false,
						catid: categoryId ? categoryId : itemCategories.activeId,
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
			}, API.timeOutDelay);
		};

		fetchItems(itemCategories.activeId);
	}, [items.loading, reduxDispatch, itemCategories.activeId]);

	useEffect(() => {
		const GetVideoCategories = () => {
			setTimeout(async () => {
				await memoizedAxiosGet(null, {
					params: {
						type: 'videosCategories',
					},
				})
					.then((response) => {
						reduxDispatch(showNotificationAction(response.data));
						setItemCategories((prev) => ({ ...prev, data: response.data.data, loading: false }));
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
		GetVideoCategories();
	}, [itemCategories.loading, reduxDispatch]);

	return (
		<>
			<Layout
				title={API.videos.title}
				tabEnable={true}
				tabItems={itemCategories}
				tabOnChange={tabOnChangeHandler}
				enablePageRefresh={true}
				onPageRefresh={doRefresh}
			>
				{items.loading ? (
					<>
						<VideoCardPlaceholder />
						<VideoCardPlaceholder />
					</>
				) : Object.keys(items.data).length > 0 ? (
					items.data.map((video) => <VideoCard key={video.id} data={video} />)
				) : (
					<>No videos to display</>
				)}
			</Layout>
		</>
	);
};

export default Videos;
