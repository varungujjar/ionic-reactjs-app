import ArticleImage from './ArticleImage';
import { Formatdate } from '../../helpers/Util';

export const ArticlePage = ({ item }) => {
	return (
		<div data-testid="article-loaded">
			<div className="article-image-full">
				<ArticleImage images={item.images} alt={item.alias} />
			</div>
			<h2 className="mt-3">{item.title}</h2>
			<div className="fs-6 mb-3 text-muted">
				<Formatdate date={item.created} />
			</div>

			<div
				className="content-wrapper"
				dangerouslySetInnerHTML={{
					__html: item.introtext ? item.introtext : null,
				}}
			/>
		</div>
	);
};

export const ArticlePagePlaceHolder = () => {
	return (
		<div data-testid="article-loading">
			<div className="article-image-full">
				<img src={'./assets/images/article-no-image.png'} className="card-img-top" alt="" />
			</div>
			<h2 className="mt-3 placeholder-glow">
				<span className="placeholder col-6"></span>
			</h2>
			<div className="fs-6 mb-3 text-muted placeholder-glow">
				<span className="placeholder col-4"></span>
			</div>
			<div className="placeholder-glow">
				<span className="placeholder col-7"></span>
				<span className="placeholder col-4"></span>
				<span className="placeholder col-4"></span>
				<span className="placeholder col-6"></span>
			</div>
		</div>
	);
};
