import Card from '../../components/Card';
import { config } from '../../config/config';
import './UserCard.css';

export const UserCardCarousel = ({ userFullName, userId, userName, userProfileImage }) => {
	const image_src = userProfileImage.rawvalue
		? config.baseUrl + JSON.parse(userProfileImage.rawvalue)['imagefile']
		: './assets/images/article-no-image.png';

	return (
		<Card>
			<div className="d-flex align-items-center p-3">
				<div className="flex-shrink-0 user-card-thumb">
					<img src={image_src} alt={userName} />
				</div>
				<div className="flex-grow-1 ms-3">
					<div className="card-body">
						<h5 className="card-title">{userName}</h5>
						<p className="card-text">{userFullName}</p>
					</div>
				</div>
			</div>
		</Card>
	);
};

export const UsersCardPlaceholder = () => {
	return (
		<Card>
			<div className="d-flex align-items-center p-3">
				<div className="flex-shrink-0 placeholder-img user-card-thumb">
					<img src={'./assets/images/article-no-image.png'} alt="" />
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
