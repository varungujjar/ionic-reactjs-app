import { useEffect, useState } from 'react';
import { API } from '../../config/config';
import { useDispatch } from 'react-redux';
import serviceApi from '../../config/axios';

import { showNotificationAction } from '../../redux/actions';
import PageLayout from '../../components/Layout/PageLayout';
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
	const [videosItems, setVideosItems] = useState({ data: {}, loading: true });
	const [videoCategories, setVideoCategories] = useState({ activeId: 0, data: {}, loading: true });

	const reduxDispatch = useDispatch();

	const setCategoryId = (categoryId) => {
		setVideosItems((prev) => ({ ...prev, loading: true }));
		setVideoCategories((prev) => ({ ...prev, activeId: categoryId }));
	};

	const doRefresh = (event) => {
		setVideosItems((prev) => ({ ...prev, loading: true }));
		setVideoCategories((prev) => ({ ...prev, loading: true }));
		event.detail.complete();
	};

	useEffect(() => {
		const GetVideoItems = (categoryId) => {
			setTimeout(async () => {
				await memoizedAxiosGet(null, {
					params: {
						type: API.videos.type,
						featured: categoryId === 0 ? true : false,
						catid: categoryId ? categoryId : videoCategories.activeId,
					},
				})
					.then((response) => {
						reduxDispatch(showNotificationAction(response.data));
						setVideosItems((prev) => ({ ...prev, data: response.data.data, loading: false }));
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

		GetVideoItems(videoCategories.activeId);
	}, [videosItems.loading, reduxDispatch, videoCategories.activeId]);

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
						setVideoCategories((prev) => ({ ...prev, data: response.data.data, loading: false }));
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
	}, [videoCategories.loading, reduxDispatch]);

	return (
		<>
			<PageLayout
				title={API.videos.title}
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
				{!videosItems.loading ? (
					Object.keys(videosItems.data).length > 0 ? (
						videosItems.data.map((video) => <VideoCard key={video.id} data={video} />)
					) : (
						<>No videos to display</>
					)
				) : (
					<>
						<VideoCardPlaceholder />
						<VideoCardPlaceholder />
					</>
				)}
			</PageLayout>
		</>
	);
};

export default Videos;
