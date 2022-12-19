import { useEffect, useState } from 'react';
import { config } from '../../config/config';
import { setToast } from '../../components/Toast';
import { useDispatch } from 'react-redux';
import api from '../../config/axios';

import PageLayout from '../../components/PageLayout';
import VideosList from './VideosList';

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

const memoizedAxiosGet = memo(api.get);

const Videos = () => {
	const [videosItems, setVideosItems] = useState({ data: {}, loading: true });
	const [videoCategories, setVideoCategories] = useState({ activeId: 0, data: {}, loading: true });
	const [refreshToggle, setRefreshToggle] = useState(false);

	const reduxDispatch = useDispatch();

	const setCategoryId = (categoryId) => {
		setVideosItems((prev) => ({ ...prev, loading: true }));
		setVideoCategories((prev) => ({ ...prev, activeId: categoryId }));
	};

	const doRefresh = (event) => {
		setVideosItems((prev) => ({ ...prev, loading: true }));
		setVideoCategories((prev) => ({ ...prev, loading: true }));
		setRefreshToggle(!refreshToggle);
		event.detail.complete();
	};

	useEffect(() => {
		const GetVideoItems = (categoryId) => {
			setTimeout(async () => {
				await memoizedAxiosGet(null, {
					params: {
						type: config.videos.type,
						featured: categoryId === 0 ? true : false,
						catid: categoryId ? categoryId : videoCategories.activeId,
					},
				})
					.then((response) => {
						setToast(reduxDispatch, response.data);
						setVideosItems((prev) => ({ ...prev, data: response.data.data, loading: false }));
					})
					.catch((error) => {
						setToast(reduxDispatch, {
							message: error.toJSON().message,
							type: 'danger',
						});
					});
			}, config.timeOutDelay);
		};

		GetVideoItems(videoCategories.activeId);
	}, [refreshToggle, reduxDispatch, videoCategories.activeId]);

	useEffect(() => {
		const GetVideoCategories = () => {
			setTimeout(async () => {
				await memoizedAxiosGet(null, {
					params: {
						type: 'videosCategories',
					},
				})
					.then((response) => {
						setToast(reduxDispatch, response.data);
						setVideoCategories((prev) => ({ ...prev, data: response.data.data, loading: false }));
					})
					.catch((error) => {
						setToast(reduxDispatch, {
							message: error.toJSON().message,
							type: 'danger',
						});
					});
			}, config.timeOutDelay);
		};
		GetVideoCategories();
	}, [refreshToggle, reduxDispatch]);

	return (
		<>
			<PageLayout
				title={config.videos.name}
				tabShow={true}
				tabItems={videoCategories.data}
				tabDefaultTitle={'Featured'}
				tabDefaultTitleValue={0}
				tabActiveValue={videoCategories.activeId}
				tabIsLoading={videoCategories.loading}
				tabOnChange={(categoryId) => setCategoryId(categoryId)}
				showPageRefresh={true}
				onPageRefresh={doRefresh}
			>
				<VideosList items={videosItems.data} isLoading={videosItems.loading} />
			</PageLayout>
		</>
	);
};

export default Videos;
