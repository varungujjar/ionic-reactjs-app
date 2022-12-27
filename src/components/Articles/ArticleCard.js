import { Truncate, Formatdate } from '../../helpers/Util';
import { API } from '../../config/config';
import { useHistory } from 'react-router';
import ArticleImage from './ArticleImage';
import Card from '../Card';

const ArticleCard = ({ data }) => {
	const history = useHistory();
	const { id, title, alias, introtext, images, created } = data;
	// console.log(data);

	const onClickHandler = (id) => {
		history.push(`${API.articles.url}/${id}`);
	};

	return (
		<Card
			onClickData={id}
			onClick={(id) => {
				onClickHandler(id);
			}}
		>
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
		</Card>
	);
};

ArticleCard.defaultProps = {
	data: {},
};

export default ArticleCard;
