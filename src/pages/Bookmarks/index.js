import { useEffect, useState } from 'react';
import { API } from '../../config/config';
import { useProfile } from '../../hooks/useProfile';
import Layout from '../../components/Layout';
import LayoutNoItemsFound from '../../components/Layout/LayoutNoItemsFound';
import ArticleCard from '../../components/Articles/ArticleCard';
import ArticleCardPlaceholder from '../../components/Articles/ArticleCardPlaceholder';
import VideoCard from '../../components/Videos/VideoCard';

const Bookmarks = () => {
	const categories = {
		data: [
			{
				id: 'articles',
				title: 'Articles',
			},
			{
				id: 'news',
				title: 'News',
			},
			{
				id: 'videos',
				title: 'Videos',
			},
		],
		loading: false,
	};
	const { articles, news, videos, loading, session } = useProfile();
	const [activeCategory, setActiveCategory] = useState(categories[0]);

	const tabOnChangeHandler = (id) => {
		setActiveCategory(id);
	};

	const doRefresh = (event) => {
		event.detail.complete();
	};

	useEffect(() => {}, [activeCategory]);

	return (
		<>
			<Layout
				title={API.bookmarks.title}
				tabEnable={true}
				tabItems={categories}
				tabOnChange={tabOnChangeHandler}
				enablePageRefresh={true}
				onPageRefresh={doRefresh}
			>
				{loading && !session && (
					<>
						<ArticleCardPlaceholder />
						<ArticleCardPlaceholder />
						<ArticleCardPlaceholder />
					</>
				)}
				{activeCategory === 'articles' &&
					(articles && articles.length ? (
						articles.map((articleItem) => <ArticleCard key={articleItem.id} data={articleItem} />)
					) : (
						<LayoutNoItemsFound message="No articles bookmarked" />
					))}
				{activeCategory === 'news' &&
					(news && news.length ? (
						news.map((newsItem) => <ArticleCard key={newsItem.id} data={newsItem} />)
					) : (
						<LayoutNoItemsFound message="No news bookmarked" />
					))}
				{activeCategory === 'videos' &&
					(videos && videos.length ? (
						videos.map((videosItem) => <VideoCard key={videosItem.id} data={videosItem} />)
					) : (
						<LayoutNoItemsFound message="No videos bookmarked" />
					))}
			</Layout>
		</>
	);
};

export default Bookmarks;
