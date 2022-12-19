import { config } from '../../config/config';
import { IonIcon } from '@ionic/react';
import { camera } from 'ionicons/icons';
import './UserCover.css';

const UserCover = ({ image, alt, isLoading, editCallback }) => {
	const imagesDecode = JSON.parse(image);
	const image_src = imagesDecode.imagefile && config.baseUrl + imagesDecode.imagefile;
	return (
		<div className="article-image-full">
			{!isLoading ? (
				<>
					<img src={image_src} alt={alt} className="articleImage" style={{ height: '250px', width: '100%', objectFit: 'cover' }} />{' '}
					<button className="btn btn-primary btn-image-edit" onClick={editCallback}>
						<IonIcon icon={camera} />
					</button>
				</>
			) : (
				<UserCoverPlaceholder />
			)}
		</div>
	);
};

UserCover.defaultProps = {
	image: JSON.stringify({}),
	alt: '',
};

export default UserCover;

const UserCoverPlaceholder = () => {
	return (
		<div className="article-image-full">
			<img
				src="./assets/images/article-no-image.png"
				alt=""
				className="articleImage placeholder"
				style={{ height: '250px', width: '100%', objectFit: 'cover' }}
			/>
		</div>
	);
};
