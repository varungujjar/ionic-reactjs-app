import { useEffect, useState } from 'react';
import { documentText } from 'ionicons/icons';
import { Formatdate } from '../../helpers/Util';
import { showNotificationAction } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { API } from '../../config/config';
import serviceApi from '../../config/axios';

import PageLayout from '../../components/Layout/PageLayout';
import ArticlePlaceholder from './ArticlePlaceholder';
import ArticleImage from '../../components/Articles/ArticleImage';

import './index.css';

const Article = (props) => {
	const { id } = props.match.params;
	const [articlesItems, setArticlesItems] = useState({ data: {}, loading: true, category: '' });
	const reduxDispatch = useDispatch();

	const DisplayItem = ({ item }) => {
		const { title, alias, created, images, introtext } = item;

		return (
			<div data-testid="article-loaded">
				<div className="article-image-full">
					<ArticleImage images={images} alt={alias} />
				</div>
				<h2 className="mt-3">{title}</h2>
				<div className="fs-6 mb-3 text-muted">
					<Formatdate date={created} />
				</div>

				<div
					className="content-wrapper"
					dangerouslySetInnerHTML={{
						__html: introtext ? introtext : null,
					}}
				/>
			</div>
		);
	};

	useEffect(() => {
		const GetArticlesItems = async () => {
			await serviceApi
				.get(null, {
					params: {
						type: API.articles.type,
						id: id,
					},
				})
				.then((response) => {
					reduxDispatch(showNotificationAction(response.data));
					setArticlesItems((prev) => ({
						...prev,
						data: response.data.data,
						loading: false,
						category: response.data.data.catid === API.news.id ? API.news.title : API.articles.title,
					}));
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
		GetArticlesItems();
	}, [id, reduxDispatch]);

	return (
		<PageLayout title={articlesItems.category} icon={documentText}>
			{!articlesItems.loading ? <DisplayItem item={articlesItems.data} /> : <ArticlePlaceholder />}
		</PageLayout>
	);
};

export default Article;
