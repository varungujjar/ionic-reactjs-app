import Card from '../Card';

const ProfileCardPlaceholder = () => {
	return (
		<Card>
			<div className="d-flex align-items-center p-3">
				<div className="flex-shrink-0 user-card-thumb">
					<img src={'./assets/images/article-no-image.png'} alt="" className="placeholder" />
				</div>
				<div className="flex-grow-1 ms-3">
					<div className="card-body">
						<h5 className="card-title placeholder-glow">
							<span className="placeholder col-6"></span>
						</h5>
						<p className="card-text placeholder-glow">
							<span className="placeholder col-4"></span>
						</p>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default ProfileCardPlaceholder;
