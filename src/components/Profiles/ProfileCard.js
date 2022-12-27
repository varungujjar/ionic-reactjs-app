import { useHistory } from 'react-router-dom';
import { API } from '../../config/config';
import Card from '../Card';

import './ProfileCard.css';

const ProfileCard = ({ data }) => {
	let history = useHistory();
	const { id, username, name, profile_image } = data;
	const image_src = profile_image.rawvalue ? API.baseUrl + JSON.parse(profile_image.rawvalue)['imagefile'] : './assets/images/article-no-image.png';

	const onClickHandler = (id) => {
		history.push(`${API.profile.url}/${id}`);
	};

	return (
		<Card onClickData={id} onClick={(id) => onClickHandler(id)}>
			<div className="d-flex align-items-center p-3">
				<div className="flex-shrink-0 user-card-thumb">
					<img src={image_src} alt={username} />
				</div>
				<div className="flex-grow-1 ms-3">
					<div className="card-body">
						<h5 className="card-title">{username}</h5>
						<p className="card-text">{name}</p>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default ProfileCard;
