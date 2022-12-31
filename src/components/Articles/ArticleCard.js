import { Truncate, Formatdate } from '../../helpers/Util';
import { API } from '../../config/config';
import { useHistory } from 'react-router';
import { getCategory } from '../../helpers/Util';
import ArticleImage from './ArticleImage';
import Card from '../Card';
import BookmarkButton from '../Bookmarks/BookmarkButton';

const ArticleCard = ({ data, list }) => {
	const history = useHistory();
	const { id, title, alias, introtext, images, created, catid } = data;
	const articleType = getCategory(catid);

	const onClickHandler = (id) => {
		history.push(`${API.articles.url}/${id}`);
	};

	return (
		<Card>
			<BookmarkButton item={{ type: articleType, id: id }} />
			<div onClick={() => onClickHandler(id)}>
				<ArticleImage images={images} alt={alias} />
				<div className="p-4">
					<h5 className="text-xl font-bold">{list ? title : Truncate(title, 26)}</h5>

					{created && (
						<div className="text-slate-400 mt-px">
							<Formatdate date={created} />
						</div>
					)}

					<div
						className="text-slate-400 mt-2"
						dangerouslySetInnerHTML={{
							__html: introtext ? Truncate(introtext, 60) : null,
						}}
					/>
				</div>
			</div>
		</Card>
	);
};

ArticleCard.defaultProps = {
	data: [],
	list: false,
};

export default ArticleCard;
