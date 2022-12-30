import { useEffect, useState } from 'react';
import { showNotificationAction } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import serviceApi from '../../config/axios';
import { API } from '../../config/config';

import Layout from '../../components/Layout';
import PageSection from '../../components/Layout/PageSection';

import VideoCarousel from '../../components/Videos/VideoCarousel';
import VideoCarouselPlaceholder from '../../components/Videos/VideoCarouselPlaceholder';
import ArticleCarousel from '../../components/Articles/ArticleCarousel';
import ArticleCarouselPlaceholder from '../../components/Articles/ArticleCarouselPlaceholder';
import ProfileCarousel from '../../components/Profiles/ProfileCarousel';
import ProfileCarouselPlaceholder from '../../components/Profiles/ProfileCarouselPlaceholder';

const Home = () => {
	const [videosItems, setVideosItems] = useState({ data: {}, loading: true });
	const [articlesItems, setArticlesItems] = useState({ data: {}, loading: true });
	const [newsItems, setNewsItems] = useState({ data: {}, loading: true });
	const [usersItems, setUsersItems] = useState({ data: {}, loading: true });
	const [refreshToggle, setRefreshToggle] = useState(false);

	const reduxDispatch = useDispatch();

	const doRefresh = (event) => {
		setVideosItems((prev) => ({ ...prev, data: {}, loading: true }));
		setArticlesItems((prev) => ({ ...prev, data: {}, loading: true }));
		setNewsItems((prev) => ({ ...prev, data: {}, loading: true }));
		setUsersItems((prev) => ({ ...prev, data: {}, loading: true }));
		setRefreshToggle(!refreshToggle);
		event.detail.complete();
	};

	useEffect(() => {
		const fetchItemsVideos = async () => {
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
		};

		const fetchItemsUsers = async () => {
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
		};

		const fetchItemsNews = async () => {
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
		};

		const fetchItemsArticles = async () => {
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
		};

		setTimeout(() => {
			fetchItemsVideos();
			fetchItemsUsers();
			fetchItemsNews();
			fetchItemsArticles();
		}, API.timeOutDelay);
	}, [reduxDispatch, refreshToggle]);

	return (
		<Layout menuButton={true} title={API.home.title} onPageRefresh={doRefresh} enablePageRefresh={true}>
			<PageSection title={API.videos.title} link={API.videos.url} />
			{videosItems.loading ? <VideoCarouselPlaceholder /> : <VideoCarousel items={videosItems} />}

			<PageSection title={API.profiles.title} />
			{usersItems.loading ? <ProfileCarouselPlaceholder /> : <ProfileCarousel items={usersItems} />}

			<PageSection title={API.articles.title} link={API.articles.url} />
			{articlesItems.loading ? <ArticleCarouselPlaceholder /> : <ArticleCarousel items={articlesItems} />}

			<PageSection title={API.news.title} link={API.news.url} />
			{newsItems.loading ? <ArticleCarouselPlaceholder /> : <ArticleCarousel items={newsItems} />}
		</Layout>
	);
};

export default Home;
