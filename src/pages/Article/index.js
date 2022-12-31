import { useEffect, useState } from 'react';
import { documentText } from 'ionicons/icons';
import { Formatdate } from '../../helpers/Util';
import { showNotificationAction } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { API } from '../../config/config';
import serviceApi from '../../config/axios';

import Layout from '../../components/Layout';
import ArticlePlaceholder from './ArticlePlaceholder';
import ArticleImage from '../../components/Articles/ArticleImage';

import './index.css';

const Article = (props) => {
	const { id } = props.match.params;
	const [item, setItem] = useState({ data: {}, loading: true, category: '' });
	const reduxDispatch = useDispatch();

	const DisplayItem = ({ item }) => {
		const { title, alias, created, images, introtext } = item;

		return (
			<div data-testid="article-loaded">
				<div className="w-full">
					<ArticleImage images={images} alt={alias} />
				</div>
				<h2 className="mt-3 text-2xl font-bold">{title}</h2>
				<div className="mt-px text-slate-400">
					<Formatdate date={created} />
				</div>

				<div
					className="mt-3"
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
					setItem((prev) => ({
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
	}, [id]);

	return (
		<Layout title={item.category} icon={documentText}>
			{item.loading ? <ArticlePlaceholder /> : <DisplayItem item={item.data} />}
		</Layout>
	);
};

export default Article;
