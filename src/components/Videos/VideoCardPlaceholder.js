import Card from '../Card';

const VideoCardPlaceholder = () => {
	return (
		<Card>
			<img
				src={'./assets/images/article-no-image.png'}
				className="h-32  object-cover placeholder w-full"
				alt="loading"
			/>
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

export default VideoCardPlaceholder;
