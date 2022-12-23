import { useEffect, useState } from 'react';
import { config } from '../../config/config';
import api from '../../config/axios';

import PageLayout from '../../components/PageLayout';
import PageSection from '../../components/PageSection';
import VideosSlider from '../Videos/VideosSlider';
import ArticlesSlider from '../Articles/ArticlesSlider';
import UsersSlider from '../Profile/UsersSlider';

import { showNotificationAction } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const Home = () => {
	const [videosItems, setVideosItems] = useState({ data: {}, loading: true });
	const [articlesItems, setArticlesItems] = useState({ data: {}, loading: true });
	const [newsItems, setNewsItems] = useState({ data: {}, loading: true });
	const [usersItems, setUsersItems] = useState({ data: {}, loading: true });
	const [refreshToggle, setRefreshToggle] = useState(false);

	const reduxDispatch = useDispatch();

	const doRefresh = (event) => {
		setVideosItems((prev) => ({ ...prev, loading: true }));
		setArticlesItems((prev) => ({ ...prev, loading: true }));
		setNewsItems((prev) => ({ ...prev, loading: true }));
		setUsersItems((prev) => ({ ...prev, loading: true }));
		setRefreshToggle(!refreshToggle);
		event.detail.complete();
	};

	useEffect(() => {
		const GetVideoItems = () => {
			setTimeout(async () => {
				await api
					.get(null, {
						params: { type: config.videos.type, featured: true },
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
			}, config.timeOutDelay);
		};
		GetVideoItems();
	}, [reduxDispatch, refreshToggle]);

	useEffect(() => {
		const GetUsersItems = async () => {
			setTimeout(async () => {
				await api
					.get(null, {
						params: {
							type: config.users.type,
						},
					})
					.then((response) => {
						reduxDispatch(showNotificationAction(response.data));
						setUsersItems((prev) => ({ ...prev, data: response.data.data, loading: false }));
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

		GetUsersItems();
	}, [reduxDispatch, refreshToggle]);

	useEffect(() => {
		const GetNewsItems = () => {
			setTimeout(async () => {
				await api
					.get(null, {
						params: {
							type: config.news.type,
							featured: true,
							catid: config.news.catid,
						},
					})
					.then((response) => {
						reduxDispatch(showNotificationAction(response.data));
						setNewsItems((prev) => ({ ...prev, data: response.data.data, loading: false }));
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
		GetNewsItems();
	}, [reduxDispatch, refreshToggle]);

	useEffect(() => {
		const GetArticlesItems = () => {
			setTimeout(async () => {
				await api
					.get(null, {
						params: {
							type: config.articles.type,
							featured: true,
							catid: config.articles.catid,
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
	}, [reduxDispatch, refreshToggle]);

	return (
		<PageLayout title={config.home.name} onPageRefresh={doRefresh} showPageRefresh={true}>
			<PageSection title={config.videos.name} link={config.videos.path} />
			<VideosSlider data={videosItems} />

			<PageSection title={config.users.name} />
			<UsersSlider data={usersItems} />

			<PageSection title={config.articles.name} link={config.articles.path} />
			<ArticlesSlider data={articlesItems} />

			<PageSection title={config.news.name} link={config.news.path} />
			<ArticlesSlider data={newsItems} />
		</PageLayout>
	);
};

export default Home;
