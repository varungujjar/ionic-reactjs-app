import { useEffect, useState } from 'react';
import { config } from '../../config/config';
import { useSelector } from 'react-redux';

import PageLayout from '../../components/PageLayout';
import VideosList from '../Videos/VideosList';
import ArticlesList from '../Articles/ArticlesList';

const Bookmarks = () => {
	const bookmarkCategories = [
		{
			id: 'news',
			title: 'News',
		},
		{
			id: 'videos',
			title: 'videos',
		},
	];

	const [bookmarksCategoriesActiveId, setBookmarksCategoriesActiveId] = useState('articles');
	const [bookmarksCategoriesLoading, setBookmarksCategoriesLoading] = useState(true);

	const [bookmarksArticles, setBookmarksArticles] = useState([]);
	const [bookmarksNews, setBookmarksNews] = useState([]);
	const [bookmarksVideos, setBookmarksVideos] = useState([]);

	const { userSession } = useSelector((state) => {
		return state.storeAuth;
	});

	const setCategoryId = (categoryId) => {
		setBookmarksCategoriesActiveId(categoryId);
	};

	const doRefresh = (event) => {
		setBookmarksCategoriesLoading(true);
		event.detail.complete();
	};

	useEffect(() => {
		const fetchData = () => {
			setTimeout(() => {
				if (userSession.articles.length > 0) {
					setBookmarksArticles(userSession.articles);
				}

				if (userSession.news.length > 0) {
					setBookmarksNews(userSession.news);
				}

				if (userSession.videos.length > 0) {
					setBookmarksVideos(userSession.videos);
				}
				setBookmarksCategoriesLoading(false);
			}, config.timeOutDelay);
		};
		if (bookmarksCategoriesLoading) {
			fetchData();
		}
	}, [bookmarksCategoriesActiveId, bookmarksCategoriesLoading, userSession.articles, userSession.news, userSession.videos]);

	return (
		<>
			<PageLayout
				title={config.bookmarks.name}
				tabShow={true}
				tabItems={bookmarkCategories}
				tabDefaultTitle={'Articles'}
				tabDefaultTitleValue={'articles'}
				tabActiveValue={bookmarksCategoriesActiveId}
				tabIsLoading={bookmarksCategoriesLoading}
				tabOnChange={(categoryId) => setCategoryId(categoryId)}
				showPageRefresh={true}
				onPageRefresh={doRefresh}
			>
				{bookmarksCategoriesActiveId === 'articles' && (
					<ArticlesList items={bookmarksArticles} isLoading={bookmarksCategoriesLoading} catRef={bookmarksCategoriesActiveId} />
				)}
				{bookmarksCategoriesActiveId === 'news' && (
					<ArticlesList items={bookmarksNews} isLoading={bookmarksCategoriesLoading} catRef={bookmarksCategoriesActiveId} />
				)}
				{bookmarksCategoriesActiveId === 'videos' && <VideosList items={bookmarksVideos} isLoading={bookmarksCategoriesLoading} />}
			</PageLayout>
		</>
	);
};

export default Bookmarks;
