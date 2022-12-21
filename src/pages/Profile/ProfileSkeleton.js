const ProfileSkeleton = () => {
	return (
		<div>
			<div className="article-image-full">
				<img
					src="./assets/images/article-no-image.png"
					alt=""
					className="articleImage placeholder"
					style={{ height: '250px', width: '100%', objectFit: 'cover' }}
				/>
			</div>
			<div className="profile-image">
				<img src="./assets/images/article-no-image.png" alt="" />
				<div className="profile-details-wrapper w-50 placeholder-glow">
					<h5>
						<span className="placeholder col-7"></span>
					</h5>
					<span className="profile-name">
						<span className="placeholder col-2"></span>
					</span>
				</div>
			</div>
			<h6>Biography</h6>
			<p className="card-text placeholder-glow">
				<span className="placeholder col-7"></span>
				<span className="placeholder col-4"></span>
				<span className="placeholder col-4"></span>
				<span className="placeholder col-6"></span>
				<span className="placeholder col-7"></span>
				<span className="placeholder col-3"></span>
			</p>
			<div className="mt-4">
				<h6>Games</h6>
				<div className="placeholder-glow">
					<span className="placeholder col-7"></span>
				</div>
			</div>
		</div>
	);
};

export default ProfileSkeleton;
