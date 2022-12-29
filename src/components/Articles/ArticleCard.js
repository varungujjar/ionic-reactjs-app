import { Truncate, Formatdate } from '../../helpers/Util';
import { API } from '../../config/config';
import { useHistory } from 'react-router';
import { getCategory } from '../../helpers/Util';
import ArticleImage from './ArticleImage';
import Card from '../Card';
import BookmarkButton from '../Bookmarks/BookmarkButton';

const ArticleCard = ({ data }) => {
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
				<div className="card-body">
					<h5 className="card-title">{title}</h5>

					{created && (
						<div className="card-text text-muted mb-2">
							<Formatdate date={created} />
						</div>
					)}

					<div
						className="card-text"
						dangerouslySetInnerHTML={{
							__html: introtext ? Truncate(introtext, 100) : null,
						}}
					/>
				</div>
			</div>
		</Card>
	);
};

ArticleCard.defaultProps = {
	data: {},
};

export default ArticleCard;
