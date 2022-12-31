const ProfilePlaceholder = () => {
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
				<img
					src="./assets/images/article-no-image.png"
					alt=""
					className="border-gray-900 border-8 bg-slate-900 rounded-full w-32 h-32"
				/>
				<div className="profile-details-wrapper w-50 placeholder-glow">
					<h5>
						<span className="placeholder col-7"></span>
					</h5>
					<span className="profile-name">
						<span className="placeholder col-2"></span>
					</span>
				</div>
			</div>
			<h6 className="text-xl font-bold text-cyan-300 text-uppercase">Biography</h6>
			<p className="card-text placeholder-glow mt-3">
				<span className="placeholder col-7"></span>
				<span className="placeholder col-4"></span>
				<span className="placeholder col-4"></span>
				<span className="placeholder col-6"></span>
				<span className="placeholder col-7"></span>
				<span className="placeholder col-3"></span>
			</p>
			<div className="mt-4">
				<h6 className="text-xl font-bold text-cyan-300 text-uppercase">Games</h6>
				<div className="placeholder-glow mt-3">
					<span className="placeholder col-7"></span>
				</div>
			</div>
		</div>
	);
};

export default ProfilePlaceholder;
