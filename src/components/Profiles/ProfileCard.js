import { useHistory } from 'react-router-dom';
import { API } from '../../config/config';
import Card from '../Card';

import './ProfileCard.css';

const ProfileCard = ({ data }) => {
	let history = useHistory();
	const { id, username, name, profile_image } = data;
	const image_src = profile_image.rawvalue
		? API.baseUrl + JSON.parse(profile_image.rawvalue)['imagefile']
		: './assets/images/article-no-image.png';

	const onClickHandler = (id) => {
		history.push(`${API.profile.url}/${id}`);
	};

	return (
		<Card>
			<div onClick={() => onClickHandler(id)}>
				<div className="d-flex align-items-center p-3">
					<div className="flex-shrink-0 user-card-thumb">
						<img src={image_src} alt={username} className="object-cover" />
					</div>
					<div className="flex-grow-1 ms-3">
						<div className="card-body">
							<h5 className="font-bold">{username}</h5>
							<p className="text-slate-400 mt-px">{name}</p>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default ProfileCard;
