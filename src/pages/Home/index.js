import { useEffect, useState } from 'react';
import { showNotificationAction } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import serviceApi from '../../config/axios';
import { API } from '../../config/config';

import PageLayout from '../../components/Layout/PageLayout';
import PageSection from '../../components/Layout/PageSection';
import VideoCarousel from '../../components/Videos/VideoCarousel';
import ArticleCarousel from '../../components/Articles/ArticleCarousel';
import UsersSlider from '../Profile/UsersSlider';

const Home = () => {
	const [videosItems, setVideosItems] = useState({ data: {}, loading: true });
	const [articlesItems, setArticlesItems] = useState({ data: {}, loading: true });
	const [newsItems, setNewsItems] = useState({ data: {}, loading: true });
	const [usersItems, setUsersItems] = useState({ data: {}, loading: true });
	const [refreshToggle, setRefreshToggle] = useState(false);

	const reduxDispatch = useDispatch();

	const doRefresh = (event) => {
		setRefreshToggle(!refreshToggle);
		setVideosItems((prev) => ({ ...prev, loading: true }));
		setArticlesItems((prev) => ({ ...prev, loading: true }));
		setNewsItems((prev) => ({ ...prev, loading: true }));
		setUsersItems((prev) => ({ ...prev, loading: true }));

		event.detail.complete();
	};

	useEffect(() => {
		const GetVideoItems = () => {
			setTimeout(async () => {
				await serviceApi
					.get(null, {
						params: { type: API.videos.type, featured: true },
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
		GetVideoItems();
	}, [reduxDispatch, refreshToggle]);

	useEffect(() => {
		const GetUsersItems = async () => {
			setTimeout(async () => {
				await serviceApi
					.get(null, {
						params: {
							type: API.profiles.type,
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
			}, API.timeOutDelay);
		};

		GetUsersItems();
	}, [reduxDispatch, refreshToggle]);

	useEffect(() => {
		const GetNewsItems = () => {
			setTimeout(async () => {
				await serviceApi
					.get(null, {
						params: {
							type: API.news.type,
							featured: true,
							catid: API.news.id,
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
			}, API.timeOutDelay);
		};
		GetNewsItems();
	}, [reduxDispatch, refreshToggle]);

	useEffect(() => {
		const GetArticlesItems = () => {
			setTimeout(async () => {
				await serviceApi
					.get(null, {
						params: {
							type: API.articles.type,
							featured: true,
							catid: API.articles.id,
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
		GetArticlesItems();
	}, [reduxDispatch, refreshToggle]);

	return (
		<PageLayout title={API.home.title} onPageRefresh={doRefresh} showPageRefresh={true}>
			<PageSection title={API.videos.title} link={API.videos.url} />
			<VideoCarousel data={videosItems} />
			<PageSection title={API.profiles.title} />
			<UsersSlider data={usersItems} />
			<PageSection title={API.articles.title} link={API.articles.url} />
			<ArticleCarousel data={articlesItems} />
			<PageSection title={API.news.title} link={API.news.url} />
			<ArticleCarousel data={newsItems} />
		</PageLayout>
	);
};

export default Home;
