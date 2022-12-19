import ArticleImage from './ArticleImage';
import Card from '../../components/Card';
import { Truncate, Formatdate } from '../../helpers/Util';

export const ArticleCard = ({ article, onClick }) => {
	const { id, title, alias, introtext, images, created } = article;

	return (
		<Card
			onClickData={id}
			onClick={(id) => {
				onClick(id);
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
	article: {},
};

export const ArticlesCardPlaceholder = () => {
	return (
		<Card>
			<img src={'./assets/images/article-no-image.png'} className="card-img-top placeholder" alt={''} />
			<div className="card-body">
				<h5 className="card-title placeholder-glow">
					<span className="placeholder col-6"></span>
				</h5>
				<p className="card-text placeholder-glow">
					<span className="placeholder col-4"></span>
				</p>
				<p className="card-text placeholder-glow">
					<span className="placeholder col-7"></span>
					<span className="placeholder col-4"></span>
					<span className="placeholder col-4"></span>
					<span className="placeholder col-6"></span>
				</p>
			</div>
		</Card>
	);
};
