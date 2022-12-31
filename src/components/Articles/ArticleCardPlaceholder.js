import Card from '../Card';

const ArticleCardPlaceholder = () => {
	return (
		<Card>
			<img src={'./assets/images/article-no-image.png'} className="h-48  object-cover w-full placeholder" alt={''} />
			<div className="p-4">
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

export default ArticleCardPlaceholder;
